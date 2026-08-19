import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
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

import { auth, db } from "@/config/firebase";

import { UserContext } from "@/context/UserContext";

export default function RegisterScreen() {
  const router = useRouter();
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext não encontrado");
  }

  const { updateUser } = context;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [emailValido, setEmailValido] = useState<boolean | null>(null);
  const [senhaValida, setSenhaValida] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const validarEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

  const validarSenha = (senha: string): boolean =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(senha);

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Erro", "Digite um e-mail válido!");
      return;
    }

    if (!validarSenha(senha)) {
      Alert.alert(
        "Erro",
        "Senha precisa ter 8+ caracteres, maiúscula, minúscula, número e símbolo.",
      );
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha,
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: nome,
        email: email,
        bio: "",
        createdAt: new Date(),
      });

      updateUser({
        uid: user.uid,
        name: nome,
        email: email,
        bio: "",
      });

      Alert.alert("Sucesso", "Conta criada!");

      router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);

      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Erro", "Este e-mail já está cadastrado.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Erro", "E-mail inválido.");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Erro", "A senha é muito fraca.");
      } else {
        Alert.alert("Erro", "Não foi possível criar a conta.");
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
              <Text style={styles.logo}>Cadastro</Text>
              <Text style={styles.subtitle}>Crie sua conta</Text>

              {/* NOME */}
              <View style={styles.inputContainer}>
                <FontAwesome6 name="user" size={16} color="#cbd5f5" />
                <TextInput
                  placeholder="Nome completo"
                  placeholderTextColor="#cbd5f5"
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

              {/* EMAIL */}
              <View style={styles.inputContainer}>
                <FontAwesome6 name="envelope" size={16} color="#cbd5f5" />
                <TextInput
                  placeholder="E-mail"
                  placeholderTextColor="#cbd5f5"
                  style={styles.input}
                  value={email}
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailValido(validarEmail(text));
                  }}
                />
              </View>

              {email.length > 0 && (
                <Text
                  style={[
                    styles.feedback,
                    { color: emailValido ? "#22c55e" : "#f87171" },
                  ]}
                >
                  {emailValido ? "E-mail válido" : "E-mail inválido"}
                </Text>
              )}

              {/* SENHA */}
              <View style={styles.inputContainer}>
                <FontAwesome6 name="lock" size={16} color="#cbd5f5" />
                <TextInput
                  placeholder="Senha"
                  placeholderTextColor="#cbd5f5"
                  style={styles.input}
                  secureTextEntry
                  value={senha}
                  onChangeText={(text) => {
                    setSenha(text);
                    setSenhaValida(validarSenha(text));
                  }}
                />
              </View>

              {senha.length > 0 && (
                <Text
                  style={[
                    styles.feedback,
                    { color: senhaValida ? "#22c55e" : "#f87171" },
                  ]}
                >
                  {senhaValida
                    ? "Senha forte"
                    : "Use 8+ caracteres, maiúscula, minúscula, número e símbolo"}
                </Text>
              )}

              {/* BOTÃO */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Criar conta</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Já tem conta? Entrar</Text>
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

  safeArea: { flex: 1 },

  gradient: { flex: 1 },

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
    marginBottom: 28,
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

  feedback: {
    alignSelf: "flex-start",
    marginBottom: 10,
    fontSize: 12,
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
