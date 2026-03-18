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

      // FUTURO LOGIN FIREBASE
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Text style={styles.logo}>Vai curintia</Text>
            <Text style={styles.subtitle}>Santos e meu piru</Text>

            {/* EMAIL */}
            <View style={styles.inputContainer}>
              <FontAwesome6
                name="envelope"
                size={18}
                color="#888"
                style={styles.icon}
              />
              <TextInput
                placeholder="E-mail"
                placeholderTextColor="#888"
                style={styles.inputWithIcon}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* SENHA */}
            <View style={styles.inputContainer}>
              <FontAwesome6
                name="lock"
                size={18}
                color="#888"
                style={styles.icon}
              />
              <TextInput
                placeholder="Senha"
                placeholderTextColor="#888"
                style={styles.inputWithIcon}
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
    backgroundColor: "#f2f2f2",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  container: {
    alignItems: "center",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1726a8",
    marginBottom: 6,
  },
  subtitle: {
    color: "#1726a8",
    fontSize: 13,
    marginBottom: 25,
    textAlign: "center",
  },

  // NOVO INPUT COM ÍCONE
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  icon: {
    marginRight: 8,
  },

  inputWithIcon: {
    flex: 1,
    padding: 12,
    color: "#333",
  },

  error: {
    color: "#cc2e2e",
    textAlign: "center",
    marginBottom: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#1726a8",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 14,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  link: {
    color: "#1726a8",
    marginTop: 18,
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
