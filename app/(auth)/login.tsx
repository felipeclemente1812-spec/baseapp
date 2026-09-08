import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
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

import { auth } from "@/config/firebase";

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

      await signInWithEmailAndPassword(auth, email, senha);

      router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setErro("E-mail ou senha incorretos.");
      } else {
        setErro("Não foi possível fazer login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#5b21b6", "#1e1b4b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
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
                <FontAwesome6 name="envelope" size={16} color="#94a3b8" />
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
                <FontAwesome6 name="lock" size={16} color="#94a3b8" />
                <TextInput
                  placeholder="Senha"
                  placeholderTextColor="#94a3b8"
                  style={styles.input}
                  secureTextEntry
                  value={senha}
                  onChangeText={setSenha}
                />
              </View>

              {/* ESQUECEU SENHA */}
              <TouchableOpacity style={styles.forgotContainer}>
                <Text style={styles.forgot}>Esqueceu a senha?</Text>
              </TouchableOpacity>

              {erro ? <Text style={styles.error}>{erro}</Text> : null}

              {/* BOTÃO */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Entrar</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },

  safeArea: {
    flex: 1,
  },

  gradient: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  container: {
    alignItems: "center",
  },

  logo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },

  subtitle: {
    color: "#cbd5f5",
    marginBottom: 30,
    textAlign: "center",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 14,
  },

  input: {
    flex: 1,
    padding: 14,
    color: "#fff",
  },

  forgotContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },

  forgot: {
    color: "#cbd5f5",
    fontSize: 13,
  },

  error: {
    color: "#f87171",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#6366f1",
    borderRadius: 16,
    width: "100%",
    paddingVertical: 14,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },

  link: {
    color: "#cbd5f5",
    marginTop: 18,
    fontSize: 14,
  },
});
