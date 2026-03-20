import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [posts] = useState([
    { id: "1", image: "https://via.placeholder.com/300" },
    { id: "2", image: "https://via.placeholder.com/300" },
    { id: "3", image: "https://via.placeholder.com/300" },
  ]);

  const handlePickImage = async () => {
    if (!isEditing) return;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permissão necessária", "Precisamos acessar sua galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert("Salvo", "Perfil atualizado (mock).");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Você saiu da conta (mock).");
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Perfil</Text>
              <View style={styles.headerButtons}>
                <TouchableOpacity onPress={handleLogout}>
                  <Ionicons name="log-out-outline" size={24} color="#ef4444" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                >
                  <Ionicons
                    name={isEditing ? "checkmark" : "create-outline"}
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={handlePickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons name="person" size={40} color="#94a3b8" />
                  </View>
                )}

                {isEditing && (
                  <View style={styles.editIcon}>
                    <Ionicons name="camera" size={16} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>

              <TextInput
                placeholder="Seu nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
                editable={isEditing}
              />

              <TextInput
                placeholder="Sua descrição"
                value={bio}
                onChangeText={setBio}
                style={[styles.input, styles.textArea]}
                multiline
                editable={isEditing}
              />

              <Text style={styles.sectionTitle}>Postagens</Text>
            </View>
          </>
        }
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.gridImage} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", padding: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerButtons: { flexDirection: "row", gap: 15 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  profileContainer: { alignItems: "center" },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 15 },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#3b82f6",
    padding: 6,
    borderRadius: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  textArea: { height: 80, textAlignVertical: "top" },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  gridImage: { width: "33%", aspectRatio: 1, padding: 2 },
});
