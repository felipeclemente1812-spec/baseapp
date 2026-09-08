import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { UserContext } from "@/context/UserContext";

export default function CompleteProfileScreen() {
  const router = useRouter();
  const context = useContext(UserContext);

  const user = context?.user;

  const [nome, setNome] = useState(user?.name || "");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState("");

  const handleContinue = () => {
    if (!nome || !usuario || !email) {
      Alert.alert(
        "Atenção",
        "Preencha o nome, nome de usuário e e-mail."
      );
      return;
    }

    if (context) {
      context.updateUser({
        name: nome,
        email: email,
        bio: bio,
      });
    }

    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#5B21B6", "#1E1B4B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* VOLTAR */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <FontAwesome6
                name="arrow-left"
                size={20}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            {/* FOTO */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <FontAwesome6
                  name="user"
                  size={58}
                  color="#FFFFFF"
                />
              </View>

              <TouchableOpacity style={styles.cameraButton}>
                <FontAwesome6
                  name="camera"
                  size={17}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Complete seu perfil</Text>

            <Text style={styles.subtitle}>
              Conte um pouco mais sobre você
            </Text>

            {/* FORMULÁRIO */}
            <View style={styles.form}>
              {/* NOME */}
              <Text style={styles.label}>Nome</Text>

              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome"
                placeholderTextColor="#B9A9D4"
              />

              {/* USUÁRIO */}
              <Text style={styles.label}>Nome de usuário</Text>

              <TextInput
                style={styles.input}
                value={usuario}
                onChangeText={setUsuario}
                placeholder="@seuusuario"
                placeholderTextColor="#B9A9D4"
                autoCapitalize="none"
              />

              {/* EMAIL */}
              <Text style={styles.label}>E-mail</Text>

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="seuemail@email.com"
                placeholderTextColor="#B9A9D4"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* BIO */}
              <Text style={styles.label}>Bio</Text>

              <TextInput
                style={[styles.input, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                placeholder="Fale um pouco sobre você..."
                placeholderTextColor="#B9A9D4"
                multiline
                textAlignVertical="top"
              />

              {/* CONTINUAR */}
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
                activeOpacity={0.8}
              >
                <Text style={styles.continueText}>
                  Continuar
                </Text>

                <FontAwesome6
                  name="arrow-right"
                  size={16}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* BARRA INFERIOR */}
          <View style={styles.bottomBar} />
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#5B21B6",
  },

  flex: {
    flex: 1,
  },

  background: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 100,
  },

  /* VOLTAR */
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  /* AVATAR */
  avatarContainer: {
    alignSelf: "center",
    position: "relative",
    marginTop: 2,
    marginBottom: 18,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#7461C7",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },

  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#4C1D95",
  },

  /* TÍTULO */
  title: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle: {
    color: "#CFC4E8",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 28,
  },

  /* FORM */
  form: {
    width: "100%",
  },

  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },

  /* CAMPOS MAIORES E ARREDONDADOS */
  input: {
    width: "100%",
    height: 56,
    backgroundColor: "rgba(255,255,255,0.13)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    paddingHorizontal: 18,
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: 18,
  },

  bioInput: {
    height: 110,
    paddingTop: 17,
    paddingBottom: 17,
  },

  /* BOTÃO */
  continueButton: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#7C3AED",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  /* BARRA INFERIOR */
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
    backgroundColor: "#160D32",
  },
});