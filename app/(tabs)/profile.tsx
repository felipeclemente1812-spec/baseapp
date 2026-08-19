import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState } from "react";
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

import { PostContext } from "../../context/PostContext";
 
export default function Profile() {
  const [name, setName] = useState("eu");
  const [username, setUsername] = useState("@comocudeveia");
  const [bio, setBio] = useState("Sem descrição ainda.");
  const [image, setImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const context = useContext(PostContext);
  if (!context) return null;

  const { posts } = context;

  const handlePickImage = async () => {
    if (!isEditing) return;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permissão necessária");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert("Perfil atualizado");
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <LinearGradient
              colors={["#5b21b6", "#1e1b4b"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.header}
            >
              <View style={styles.topBar}>
                <Text style={styles.title}>Perfil</Text>

                <TouchableOpacity
                  onPress={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                >
                  <Ionicons
                    name={isEditing ? "checkmark" : "create-outline"}
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>

              {/* AVATAR */}
              <TouchableOpacity onPress={handlePickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons name="person" size={40} color="#cbd5f5" />
                  </View>
                )}

                {isEditing && (
                  <View style={styles.editIcon}>
                    <Ionicons name="camera" size={14} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>

              {/* NOME */}
              <TextInput
                value={name}
                onChangeText={setName}
                editable={isEditing}
                style={styles.name}
              />

              <TextInput
                value={username}
                onChangeText={setUsername}
                editable={isEditing}
                style={styles.username}
              />

              {/* BIO */}
              <TextInput
                value={bio}
                onChangeText={setBio}
                editable={isEditing}
                style={styles.bio}
                multiline
              />

              {/* MÉTRICAS */}
              <View style={styles.stats}>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>{posts.length}</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>

                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>1200</Text>
                  <Text style={styles.statLabel}>Pontos</Text>
                </View>

                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>#42</Text>
                  <Text style={styles.statLabel}>Ranking</Text>
                </View>
              </View>
            </LinearGradient>

            {/* SEÇÃO */}
            <Text style={styles.sectionTitle}>Postagens</Text>
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
  container: { flex: 1, backgroundColor: "#0f172a" },

  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  topBar: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  title: { color: "#fff", fontSize: 20, fontWeight: "600" },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#6366f1",
  },

  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#6366f1",
    padding: 6,
    borderRadius: 20,
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },

  username: {
    color: "#cbd5f5",
    fontSize: 14,
    marginBottom: 5,
  },

  bio: {
    color: "#e2e8f0",
    textAlign: "center",
    paddingHorizontal: 30,
    fontSize: 13,
    marginBottom: 10,
  },

  stats: {
    flexDirection: "row",
    marginTop: 10,
    gap: 25,
  },

  statBox: { alignItems: "center" },

  statNumber: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  statLabel: {
    color: "#cbd5f5",
    fontSize: 12,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    margin: 15,
  },

  gridImage: {
    width: "33%",
    aspectRatio: 1,
    padding: 2,
  },
});