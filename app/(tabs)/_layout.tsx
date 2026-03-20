import Colors from "@/constants/Colors";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PostProvider } from "../../context/PostContext";
import { UserProvider } from "../../context/UserContext";

const Layout = () => {
  return (
    <UserProvider>
      <PostProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
          <Tabs
            screenOptions={{
              tabBarStyle: {
                backgroundColor: Colors.grey,
                position: "absolute",
                bottom: Platform.OS === "ios" ? 20 : 15,
                left: 60,
                right: 60,
                height: 55,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: Colors.tintcolor,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.25,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 6,
                elevation: 8,
                zIndex: 999,
              },
              tabBarShowLabel: false,
              tabBarInactiveTintColor: "#000000ff",
              tabBarActiveTintColor: "#000000ff",
              headerShown: false,
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: focused ? Colors.tintcolor : Colors.grey,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome6
                      name="house-chimney"
                      size={22}
                      color={color}
                    />
                  </View>
                ),
              }}
            />

            <Tabs.Screen
              name="challenges"
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: focused ? Colors.tintcolor : Colors.grey,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome6 name="trophy" size={22} color={color} />
                  </View>
                ),
              }}
            />

            <Tabs.Screen
              name="profile"
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: focused ? Colors.tintcolor : Colors.grey,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome name="user" size={22} color={color} />
                  </View>
                ),
              }}
            />
          </Tabs>
        </SafeAreaView>
        <StatusBar style="light" />
      </PostProvider>
    </UserProvider>
  );
};

export default Layout;
