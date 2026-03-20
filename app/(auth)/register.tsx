import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
    // 🔴 valida antes de salvar (óbvio, mas aparentemente necessário falar)
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

      // ✅ AGORA SIM salva certo
      updateUser({
        name: nome,
      });

      Alert.alert("Sucesso", "Conta criada!");
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a conta.");
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
            <Text style={styles.logo}>Cadastro</Text>
            <Text style={styles.subtitle}>Crie sua conta</Text>

            {/* NOME */}
            <View style={styles.inputContainer}>
              <FontAwesome6 name="user" size={18} color="#94a3b8" />
              <TextInput
                placeholder="Nome Completo"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
              />
            </View>

            {/* EMAIL */}
            <View style={styles.inputContainer}>
              <FontAwesome6 name="envelope" size={18} color="#94a3b8" />
              <TextInput
                placeholder="E-mail"
                placeholderTextColor="#94a3b8"
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
                  { color: emailValido ? "#3b82f6" : "#ef4444" },
                ]}
              >
                {emailValido ? "E-mail válido" : "E-mail inválido"}
              </Text>
            )}

            {/* SENHA */}
            <View style={styles.inputContainer}>
              <FontAwesome6 name="lock" size={18} color="#94a3b8" />
              <TextInput
                placeholder="Senha"
                placeholderTextColor="#94a3b8"
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
                  { color: senhaValida ? "#3b82f6" : "#ef4444" },
                ]}
              >
                {senhaValida
                  ? "Senha forte"
                  : "8+ caracteres, maiúscula, minúscula, número e símbolo"}
              </Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>CRIAR CONTA</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.link}>Já tem conta? Entrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },

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
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: 20,
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

  feedback: {
    alignSelf: "flex-start",
    marginBottom: 10,
    fontSize: 13,
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
