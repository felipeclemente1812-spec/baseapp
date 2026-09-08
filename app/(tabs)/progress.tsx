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

export default function Progress() {
  const xp = 2550;
  const maxXp = 3000;
  const progress = (xp / maxXp) * 100;

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

          <Text style={styles.title}>Meu progresso</Text>

          <View style={styles.levelCard}>
            <Text style={styles.level}>Nível 12</Text>

            <Text style={styles.xp}>
              {xp.toLocaleString("pt-BR")} / {maxXp} XP
            </Text>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progress,
                  { width: `${progress}%` },
                ]}
              />
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            Desafios em andamento
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Ler 10 livros
            </Text>

            <Text style={styles.cardDescription}>
              8 de 10 livros concluídos
            </Text>

            <View style={styles.smallProgressBackground}>
              <View style={[styles.smallProgress, { width: "80%" }]} />
            </View>

            <Text style={styles.counter}>8/10</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Treinar 5 dias da semana
            </Text>

            <Text style={styles.cardDescription}>
              3 de 5 dias concluídos
            </Text>

            <View style={styles.smallProgressBackground}>
              <View style={[styles.smallProgress, { width: "60%" }]} />
            </View>

            <Text style={styles.counter}>3/5</Text>
          </View>

          <Text style={styles.sectionTitle}>
            Metas concluídas
          </Text>

          <View style={styles.completedCard}>
            <Text style={styles.completedIcon}>🏆</Text>

            <View>
              <Text style={styles.cardTitle}>
                Desafios concluídos
              </Text>

              <Text style={styles.cardDescription}>
                Concluiu 24 desafios!
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
    marginBottom: 15,
  },

  levelCard: {
    backgroundColor: "#25193A",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },

  level: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  xp: {
    color: "#D8C5E7",
    fontSize: 10,
    marginTop: 5,
  },

  progressBackground: {
    height: 10,
    backgroundColor: "#57356F",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: "#B832E5",
  },

  sectionTitle: {
    color: "#FFF",
    fontSize: 13,
    marginBottom: 7,
    marginTop: 5,
  },

  card: {
    backgroundColor: "#25193A",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },

  cardTitle: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },

  cardDescription: {
    color: "#BDB1CE",
    fontSize: 9,
    marginTop: 4,
  },

  smallProgressBackground: {
    height: 7,
    backgroundColor: "#57356F",
    borderRadius: 8,
    marginTop: 8,
    overflow: "hidden",
  },

  smallProgress: {
    height: "100%",
    backgroundColor: "#7C3AED",
  },

  counter: {
    color: "#DDD6FE",
    fontSize: 9,
    marginTop: 4,
    textAlign: "right",
  },

  completedCard: {
    backgroundColor: "#25193A",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  completedIcon: {
    fontSize: 30,
    marginRight: 10,
  },
});