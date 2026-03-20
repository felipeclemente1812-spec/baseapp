import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
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

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }

    try {
      setErro("");
      setLoading(true);

      // FUTURO FIREBASE
      // await signInWithEmailAndPassword(auth, email, senha);

      router.replace("/(tabs)");
    } catch (err) {
      setErro("Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.logo}>Login</Text>
            <Text style={styles.subtitle}>Entre na sua conta</Text>

            {/* EMAIL */}
            <View style={styles.inputContainer}>
              <FontAwesome6 name="envelope" size={18} color="#94a3b8" />
              <TextInput
                placeholder="E-mail"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* SENHA */}
            <View style={styles.inputContainer}>
              <FontAwesome6 name="lock" size={18} color="#94a3b8" />
              <TextInput
                placeholder="Senha"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />
            </View>

            {erro ? <Text style={styles.error}>{erro}</Text> : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>ENTRAR</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#0f172a",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  container: {
    alignItems: "center",
  },

  logo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: 25,
    textAlign: "center",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#1e293b",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    padding: 12,
    color: "#fff",
  },

  error: {
    color: "#ef4444",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#971313",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 14,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  link: {
    color: "#94a3b8",
    marginTop: 15,
  },
});
