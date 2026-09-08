import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const users = [
  { position: 1, name: "Felipe", xp: 3200, medal: "🥇" },
  { position: 2, name: "Enzo", xp: 2900, medal: "🥈" },
  { position: 3, name: "Wesley", xp: 2099, medal: "🥉" },
  { position: 4, name: "David", xp: 1980, medal: "" },
  { position: 5, name: "Raul", xp: 1750, medal: "" },
];

export default function Ranking() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#6B4A91", "#43247D"]}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Ranking</Text>

          <View style={styles.tabs}>
            <View style={styles.activeTab}>
              <Text style={styles.tabText}>Global</Text>
            </View>

            <View style={styles.tab}>
              <Text style={styles.tabText}>Amigos</Text>
            </View>

            <View style={styles.tab}>
              <Text style={styles.tabText}>Semanal</Text>
            </View>
          </View>

          {users.map((user) => (
            <View
              key={user.position}
              style={[
                styles.userCard,
                user.name === "Wesley" && styles.currentUser,
              ]}
            >
              <Text style={styles.position}>
                {user.medal || user.position}
              </Text>

              <View style={styles.avatar}>
                <Text>👤</Text>
              </View>

              <Text style={styles.name}>{user.name}</Text>

              <Text style={styles.xp}>{user.xp} XP</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreText}>Mostrar mais</Text>
          </TouchableOpacity>

          <View style={styles.scoreCard}>
            <View style={styles.avatarBig}>
              <Text style={{ fontSize: 28 }}>👤</Text>
            </View>

            <View>
              <Text style={styles.scoreTitle}>
                Sua pontuação:
              </Text>

              <Text style={styles.score}>
                2099 XP
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
  },

  content: {
    padding: 15,
    paddingBottom: 50,
  },

  back: {
    color: "#FFF",
    fontSize: 25,
  },

  title: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 12,
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#25193A",
    borderRadius: 8,
    padding: 4,
    marginBottom: 10,
  },

  activeTab: {
    flex: 1,
    backgroundColor: "#5B21B6",
    borderRadius: 5,
    padding: 7,
    alignItems: "center",
  },

  tab: {
    flex: 1,
    padding: 7,
    alignItems: "center",
  },

  tabText: {
    color: "#FFF",
    fontSize: 10,
  },

  userCard: {
    backgroundColor: "#25193A",
    borderRadius: 7,
    height: 40,
    marginBottom: 5,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  currentUser: {
    borderWidth: 1,
    borderColor: "#7C3AED",
  },

  position: {
    color: "#FFF",
    width: 25,
    fontSize: 14,
    textAlign: "center",
  },

  avatar: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#7774D6",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 7,
  },

  name: {
    color: "#FFF",
    flex: 1,
    fontSize: 11,
  },

  xp: {
    color: "#D8C5E7",
    fontSize: 10,
  },

  moreButton: {
    backgroundColor: "#5B21B6",
    padding: 9,
    borderRadius: 7,
    alignItems: "center",
    marginTop: 5,
  },

  moreText: {
    color: "#FFF",
    fontSize: 10,
  },

  scoreCard: {
    backgroundColor: "#25193A",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarBig: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#7774D6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  scoreTitle: {
    color: "#FFF",
    fontSize: 11,
  },

  score: {
    color: "#B83CE5",
    fontSize: 15,
    marginTop: 3,
  },
});