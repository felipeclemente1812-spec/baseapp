import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState } from "react";
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

import { PostContext } from "../../context/PostContext";

export default function Index() {
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const progress = useState(new Animated.Value(0))[0];

  const context = useContext(PostContext);
  if (!context) throw new Error("PostContext não encontrado");

  const { posts, addPost } = context;

  const handleAddImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permissão necessária");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (!postText && !image) return;

    addPost({
      id: Date.now().toString(),
      text: postText,
      image,
    });

    setPostText("");
    setImage(null);

    Animated.timing(progress, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start(() => progress.setValue(0));
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={["#5b21b6", "#1e1b4b"]}
        style={styles.header}
      >
        <Text style={styles.title}>Feed</Text>
      </LinearGradient>

      {/* CARD POST */}
      <View style={styles.card}>
        <TextInput
          placeholder="O que você está pensando?"
          placeholderTextColor="#94a3b8"
          value={postText}
          onChangeText={setPostText}
          style={styles.input}
          multiline
        />

        {image && (
          <Image source={{ uri: image }} style={styles.previewImage} />
        )}

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleAddImage}
          >
            <Ionicons name="image" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handlePost}>
            <Text style={styles.buttonText}>Postar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressBg}>
          <Animated.View
            style={[styles.progress, { width: progressWidth }]}
          />
        </View>
      </View>

      {/* LISTA */}
      <FlatList
        contentContainerStyle={{ padding: 16 }}
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
  },

  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  card: {
    margin: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 12,
  },

  input: {
    color: "#fff",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginBottom: 10,
    minHeight: 50,
  },

  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconButton: {
    backgroundColor: "#334155",
    padding: 10,
    borderRadius: 20,
  },

  button: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  progressBg: {
    height: 5,
    backgroundColor: "#1e293b",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: "#6366f1",
  },

  post: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },

  postText: {
    color: "#e2e8f0",
    marginBottom: 8,
  },

  image: {
    width: "100%",
    height: 240,
    borderRadius: 12,
  },
});