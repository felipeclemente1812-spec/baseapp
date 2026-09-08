import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PostProvider } from "../../context/PostContext";
import { UserProvider } from "../../context/UserContext";

const TabIcon = ({ focused, children }: any) => {
  return (
    <View
      style={{
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: focused
          ? "rgba(255,255,255,0.15)"
          : "transparent",
      }}
    >
      <View
        style={{
          transform: [{ scale: focused ? 1.1 : 1 }],
        }}
      >
        {children}
      </View>
    </View>
  );
};

const Layout = () => {
  return (
    <UserProvider>
      <PostProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,

              // 🔴 ESSENCIAL PRA CENTRALIZAR
              tabBarItemStyle: {
                flex: 1,
                height: 65,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 0,
                paddingHorizontal: 0,
              },

              tabBarStyle: {
                position: "absolute",
                bottom: Platform.OS === "ios" ? 20 : 15,
                left: 40,
                right: 40,
                height: 65,
                borderRadius: 30,
                overflow: "hidden",
                backgroundColor: "transparent",
                borderTopWidth: 0,
                elevation: 0,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                width: undefined,
              },

              tabBarBackground: () => (
                <LinearGradient
                  colors={["#5b21b6", "#1e1b4b"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    flex: 1,
                    borderRadius: 30,
                  }}
                />
              ),
            }}
          >
            {/* HOME */}
            <Tabs.Screen
              name="index"
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabIcon focused={focused}>
                    <FontAwesome6
                      name="house-chimney"
                      size={20}
                      color="#fff"
                      style={{ opacity: focused ? 1 : 0.7 }}
                    />
                  </TabIcon>
                ),
              }}
            />

            {/* CHALLENGES */}
            <Tabs.Screen
              name="challenges"
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabIcon focused={focused}>
                    <FontAwesome6
                      name="trophy"
                      size={20}
                      color="#fff"
                      style={{ opacity: focused ? 1 : 0.7 }}
                    />
                  </TabIcon>
                ),
              }}
            />

            {/* PROFILE */}
            <Tabs.Screen
              name="profile"
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabIcon focused={focused}>
                    <FontAwesome
                      name="user"
                      size={20}
                      color="#fff"
                      style={{ opacity: focused ? 1 : 0.7 }}
                    />
                  </TabIcon>
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