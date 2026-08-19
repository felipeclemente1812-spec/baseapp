import React, { createContext, ReactNode, useState } from "react";

type UserType = {
  uid: string;
  name: string;
  email: string;
  bio: string;
};

type UserContextType = {
  user: UserType;
  updateUser: (data: Partial<UserType>) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType>({
    uid: "",
    name: "",
    email: "",
    bio: "",
  });

  const updateUser = (data: Partial<UserType>) => {
    setUser((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
