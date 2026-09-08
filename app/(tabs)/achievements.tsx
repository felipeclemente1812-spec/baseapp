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

const achievements = [
  {
    title: "Primeiros passos",
    description: "Complete seu primeiro desafio.",
    icon: "🏅",
    unlocked: true,
  },
  {
    title: "Foco diário",
    description: "Complete desafios durante 5 dias.",
    icon: "🔥",
    unlocked: true,
  },
  {
    title: "Sequência de 7 dias",
    description: "Mantenha uma sequência por 7 dias.",
    icon: "🔥",
    unlocked: true,
  },
  {
    title: "Mestre do foco",
    description: "Alcance 2.500 XP.",
    icon: "🏆",
    unlocked: false,
  },
  {
    title: "Desafio social",
    description: "Complete um desafio com amigos.",
    icon: "👥",
    unlocked: false,
  },
  {
    title: "Super focado",
    description: "Complete 50 desafios.",
    icon: "⭐",
    unlocked: false,
  },
];

export default function Achievements() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#6B4A91", "#43247D"]}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.back}>←</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Conquistas</Text>

            <View style={{ width: 25 }} />
          </View>

          <View style={styles.tabs}>
            <View style={styles.activeTab}>
              <Text style={styles.tabText}>Todas</Text>
            </View>

            <View style={styles.tab}>
              <Text style={styles.tabText}>Conquistadas</Text>
            </View>

            <View style={styles.tab}>
              <Text style={styles.tabText}>Recentes</Text>
            </View>
          </View>

          <View style={styles.grid}>
            {achievements.map((achievement, index) => (
              <View
                key={index}
                style={[
                  styles.card,
                  !achievement.unlocked && styles.locked,
                ]}
              >
                <Text style={styles.icon}>
                  {achievement.unlocked ? achievement.icon : "🔒"}
                </Text>

                <Text style={styles.cardTitle}>
                  {achievement.title}
                </Text>

                <Text style={styles.description}>
                  {achievement.description}
                </Text>

                {achievement.unlocked && (
                  <View style={styles.check}>
                    <Text>✓</Text>
                  </View>
                )}
              </View>
            ))}
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
    paddingBottom: 90,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  back: {
    color: "#FFF",
    fontSize: 25,
  },

  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "600",
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#25193A",
    borderRadius: 8,
    padding: 4,
    marginBottom: 12,
  },

  activeTab: {
    flex: 1,
    backgroundColor: "#5B21B6",
    borderRadius: 6,
    padding: 8,
    alignItems: "center",
  },

  tab: {
    flex: 1,
    padding: 8,
    alignItems: "center",
  },

  tabText: {
    color: "#FFF",
    fontSize: 11,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    minHeight: 145,
    backgroundColor: "#25193A",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  locked: {
    opacity: 0.55,
  },

  icon: {
    fontSize: 35,
    marginBottom: 8,
  },

  cardTitle: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },

  description: {
    color: "#BDB1CE",
    fontSize: 9,
    textAlign: "center",
    marginTop: 5,
  },

  check: {
    position: "absolute",
    right: 7,
    top: 7,
    backgroundColor: "#16A34A",
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});