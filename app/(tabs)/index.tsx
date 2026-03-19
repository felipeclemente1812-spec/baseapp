import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const progress = useState(new Animated.Value(0))[0];

  const handleAddImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permissão necessária", "Precisamos de acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (!postText && !image) return;

    const newPost = {
      id: Date.now().toString(),
      text: postText,
      image: image,
    };

    setPosts([newPost, ...posts]);
    setPostText("");
    setImage(null);

    Animated.timing(progress, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      progress.setValue(0);
    });
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu App Base</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="O que você está pensando?"
          placeholderTextColor="#94a3b8"
          value={postText}
          onChangeText={setPostText}
          style={styles.input}
        />

        {image && <Image source={{ uri: image }} style={styles.previewImage} />}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleAddImage}>
            <Ionicons name="image" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonPrimary} onPress={handlePost}>
            <Text style={styles.buttonText}>Postar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[styles.progressBar, { width: progressWidth }]}
          />
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            {item.text ? (
              <Text style={styles.postText}>{item.text}</Text>
            ) : null}
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.image} />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#334155",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 50,
  },
  buttonPrimary: {
    backgroundColor: "#22c55e",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#334155",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#22c55e",
  },
  post: {
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  postText: {
    color: "#fff",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    resizeMode: "cover",
  },
});
