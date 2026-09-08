import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function ChallengeComplete() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#6B4A91", "#43247D"]}
        style={styles.background}
      >
        <View style={styles.content}>
          <Text style={styles.confetti}>
            🎉
          </Text>

          <Text style={styles.title}>
            Desafio Concluído!
          </Text>

          <View style={styles.trophy}>
            <Text style={styles.trophyText}>
              🏆
            </Text>
          </View>

          <Text style={styles.xp}>
            +150 XP
          </Text>

          <Text style={styles.message}>
            Parabéns você completou o desafio!
          </Text>

          <View style={styles.card}>
            <Text style={styles.total}>
              Total XP
            </Text>

            <Text style={styles.totalXp}>
              2.412 XP
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  confetti: {
    fontSize: 35,
    marginBottom: 5,
  },

  title: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "600",
  },

  trophy: {
    marginVertical: 20,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#5B21B6",
    justifyContent: "center",
    alignItems: "center",
  },

  trophyText: {
    fontSize: 65,
  },

  xp: {
    color: "#B83CE5",
    fontSize: 25,
    fontWeight: "600",
  },

  message: {
    color: "#FFF",
    fontSize: 11,
    marginTop: 10,
    textAlign: "center",
  },

  card: {
    width: "100%",
    backgroundColor: "#25193A",
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    alignItems: "center",
  },

  total: {
    color: "#FFF",
    fontSize: 10,
  },

  totalXp: {
    color: "#B83CE5",
    fontSize: 14,
    marginTop: 3,
  },

  button: {
    width: "100%",
    backgroundColor: "#7C22E8",
    borderRadius: 6,
    padding: 11,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 11,
  },
});