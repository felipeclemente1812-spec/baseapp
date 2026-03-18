import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

const PRIMARY = "#1726a8";

export default function RegisterScreen() {
  const router = useRouter();

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
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.card}>
              {/* HEADER */}
              <View style={styles.header}>
                <Text style={styles.logo}>Cadastro du curintia</Text>
                <Text style={styles.subtitle}>Santos menor de SP</Text>
              </View>

              {/* NOME */}
              <View style={styles.inputContainer}>
                <FontAwesome6
                  name="user"
                  size={18}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Nome Completo"
                  placeholderTextColor="#888"
                  style={styles.inputWithIcon}
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

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
                    { color: emailValido ? "#1f8a1f" : "#cc2e2e" },
                  ]}
                >
                  {emailValido ? "E-mail válido" : "E-mail inválido"}
                </Text>
              )}

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
                    { color: senhaValida ? "#1f8a1f" : "#cc2e2e" },
                  ]}
                >
                  {senhaValida
                    ? "Senha forte"
                    : "8+ caracteres, maiúscula, minúscula, número e símbolo"}
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
                  <Text style={styles.buttonText}>CRIAR CONTA</Text>
                )}
              </TouchableOpacity>

              {/* LINK */}
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Já tem conta? Entrar</Text>
              </TouchableOpacity>
            </View>
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

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  logo: {
    fontSize: 26,
    fontWeight: "bold",
    color: PRIMARY,
  },

  subtitle: {
    color: "#666",
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },

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

  feedback: {
    alignSelf: "flex-start",
    marginBottom: 10,
    fontSize: 13,
  },

  button: {
    backgroundColor: PRIMARY,
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
    color: PRIMARY,
    marginTop: 18,
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
