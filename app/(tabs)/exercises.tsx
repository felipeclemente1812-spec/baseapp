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

const exercises = [
  {
    id: "1",
    title: "Alongamento",
    description: "Exercícios para relaxar e alongar o corpo.",
    duration: "5 min",
    xp: 50,
    icon: "🧘",
  },
  {
    id: "2",
    title: "Caminhada",
    description: "Movimente-se e mantenha seu corpo ativo.",
    duration: "15 min",
    xp: 100,
    icon: "🚶",
  },
  {
    id: "3",
    title: "Treino rápido",
    description: "Uma sequência simples para ativar o corpo.",
    duration: "10 min",
    xp: 80,
    icon: "💪",
  },
  {
    id: "4",
    title: "Respiração",
    description: "Exercícios para relaxamento e concentração.",
    duration: "5 min",
    xp: 50,
    icon: "🌿",
  },
];

export default function Exercises() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#171124", "#0D0A16"]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Exercícios</Text>

          <View style={styles.headerPlaceholder} />
        </View>

        {/* INTRODUÇÃO */}
        <View style={styles.intro}>
          <Text style={styles.title}>Movimente-se 🚀</Text>

          <Text style={styles.subtitle}>
            Escolha um exercício para cuidar do seu corpo e ganhar XP.
          </Text>
        </View>

        {/* XP */}
        <LinearGradient
          colors={["#6D3BFF", "#9B5CFF"]}
          style={styles.xpCard}
        >
          <View>
            <Text style={styles.xpLabel}>XP disponível</Text>
            <Text style={styles.xpValue}>750 XP</Text>
          </View>

          <Text style={styles.xpIcon}>⭐</Text>
        </LinearGradient>

        {/* TÍTULO */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Exercícios disponíveis</Text>
          <Text style={styles.sectionCount}>{exercises.length}</Text>
        </View>

        {/* EXERCÍCIOS */}
        {exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            activeOpacity={0.85}
            style={styles.exerciseCard}
            onPress={() => {
              // Futuramente pode abrir os detalhes do exercício
            }}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.exerciseIcon}>{exercise.icon}</Text>
            </View>

            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>

              <Text style={styles.exerciseDescription}>
                {exercise.description}
              </Text>

              <View style={styles.detailsRow}>
                <View style={styles.detail}>
                  <Text style={styles.detailIcon}>⏱</Text>
                  <Text style={styles.detailText}>
                    {exercise.duration}
                  </Text>
                </View>

                <View style={styles.detail}>
                  <Text style={styles.detailIcon}>⭐</Text>
                  <Text style={styles.detailText}>
                    +{exercise.xp} XP
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}

        {/* INFORMAÇÃO */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>💡</Text>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Dica</Text>

            <Text style={styles.infoText}>
              Complete exercícios regularmente para manter sua sequência
              e evoluir no Focus.
            </Text>
          </View>
        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.mainButton}
          onPress={() => router.push("/challenges")}
        >
          <Text style={styles.mainButtonText}>Ver meus desafios</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0A16",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 35,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#211A31",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 34,
    marginTop: -3,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  headerPlaceholder: {
    width: 40,
  },

  intro: {
    marginBottom: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },

  subtitle: {
    color: "#A9A2B8",
    fontSize: 14,
    lineHeight: 21,
  },

  xpCard: {
    borderRadius: 18,
    padding: 20,
    marginBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  xpLabel: {
    color: "#E9DFFF",
    fontSize: 13,
    marginBottom: 5,
  },

  xpValue: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
  },

  xpIcon: {
    fontSize: 32,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  sectionCount: {
    marginLeft: 10,
    color: "#B77CFF",
    backgroundColor: "#26183A",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "700",
  },

  exerciseCard: {
    backgroundColor: "#181321",
    borderWidth: 1,
    borderColor: "#292238",
    borderRadius: 18,
    padding: 15,
    marginBottom: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#251B35",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  exerciseIcon: {
    fontSize: 26,
  },

  exerciseInfo: {
    flex: 1,
  },

  exerciseTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  exerciseDescription: {
    color: "#8F889F",
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 9,
  },

  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  detail: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
  },

  detailIcon: {
    fontSize: 12,
    marginRight: 5,
  },

  detailText: {
    color: "#B8B0C7",
    fontSize: 11,
    fontWeight: "600",
  },

  arrow: {
    color: "#8C7BA6",
    fontSize: 27,
    marginLeft: 8,
  },

  infoCard: {
    backgroundColor: "#171222",
    borderWidth: 1,
    borderColor: "#2A2238",
    borderRadius: 17,
    padding: 16,
    marginTop: 8,
    flexDirection: "row",
  },

  infoIcon: {
    fontSize: 22,
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
  },

  infoText: {
    color: "#91899F",
    fontSize: 12,
    lineHeight: 18,
  },

  mainButton: {
    height: 52,
    borderRadius: 15,
    backgroundColor: "#713CFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});