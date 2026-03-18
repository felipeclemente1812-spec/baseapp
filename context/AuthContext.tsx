import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  nome: string;
  email: string;
  senha: string; // ✅ adiciona este campo
}

interface AuthContextData {
  user: User | null;
  login: (email: string, senha: string) => Promise<boolean>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Carregar usuário salvo
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@user");
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.log("Erro ao carregar usuáario:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // 🔹 Login
  const login = async (email: string, senha: string) => {
    try {
      const data = await AsyncStorage.getItem("@user");
      if (!data) return false;

      const savedUser: User = JSON.parse(data);
      if (savedUser.email === email && savedUser.senha === senha) {
        setUser(savedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.log("Erro no login:", error);
      return false;
    }
  };

  // 🔹 Cadastro
  const register = async (nome: string, email: string, senha: string) => {
    try {
      const newUser: User = { nome, email, senha };
      await AsyncStorage.setItem("@user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.log("Erro no registro:", error);
    }
  };

  // 🔹 Logout
  const logout = async () => {
    setUser(null); // apenas desconecta, NÃO APAGA @user
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
