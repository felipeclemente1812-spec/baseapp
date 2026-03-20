import React, { createContext, useState } from "react";

type UserType = {
  name: string;
  bio: string;
};

type UserContextType = {
  user: UserType;
  updateUser: (data: Partial<UserType>) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<UserType>({
    name: "",
    bio: "",
  });

  const updateUser = (data: Partial<UserType>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
