import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";

import { PostProvider } from "@/context/PostContext";
import { UserProvider } from "@/context/UserContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  // 🔒 Providers envolvem toda a app (auth + tabs)
  return (
    <UserProvider>
      <PostProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="register" /> {/* se você tiver register */}
          <Stack.Screen name="(tabs)" />
        </Stack>
      </PostProvider>
    </UserProvider>
  );
}
