import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Challenges() {
  const [xp, setXp] = useState(0);
  const [xpText, setXpText] = useState("");
  const [xpAnim] = useState(new Animated.Value(0));

  const [levelAnim] = useState(new Animated.Value(0));
  const [showLevelUp, setShowLevelUp] = useState(false);

  const XP_PER_LEVEL = 500;

  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const prevLevelRef = useRef(level);

  const [challenges, setChallenges] = useState([
    { id: "1", title: "Postar algo", xp: 50, done: false },
    { id: "2", title: "Ganhar 5 likes", xp: 100, done: false },
    { id: "3", title: "Comparar 3 posts", xp: 80, done: false },
    { id: "4", title: "Logar 3 dias seguidos", xp: 120, done: false },
  ]);

  const handleComplete = (id: string) => {
    const challenge = challenges.find((c) => c.id === id);
    if (!challenge || challenge.done) return;

    setXp((prev) => prev + challenge.xp);
    setXpText(`+${challenge.xp} XP`);

    Animated.timing(xpAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      xpAnim.setValue(0);
      setXpText("");
    });

    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, done: true } : c))
    );
  };

  const currentXp = xp % XP_PER_LEVEL;
  const xpToNext = XP_PER_LEVEL - currentXp;
  const progress = (currentXp / XP_PER_LEVEL) * 100;

  const translateY = xpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

  const opacity = xpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  useEffect(() => {
    if (level > prevLevelRef.current) {
      setShowLevelUp(true);

      Animated.timing(levelAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        levelAnim.setValue(0);
        setShowLevelUp(false);
      });
    }

    prevLevelRef.current = level;
  }, [level]);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={["#5b21b6", "#1e1b4b"]}
        style={styles.header}
      >
        <Text style={styles.title}>Desafios</Text>

        <View style={styles.levelCard}>
          <Text style={styles.level}>Nível {level}</Text>

          <Text style={styles.progressText}>
            {currentXp} / {XP_PER_LEVEL} XP
          </Text>

          <View style={styles.progressBarBg}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>

          <Text style={styles.next}>
            Faltam {xpToNext} XP
          </Text>

          {xpText !== "" && (
            <Animated.Text
              style={[
                styles.xpFloating,
                { transform: [{ translateY }], opacity },
              ]}
            >
              {xpText}
            </Animated.Text>
          )}
        </View>
      </LinearGradient>

      {/* LISTA */}
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.challenge}>
            <View>
              <Text style={styles.challengeTitle}>{item.title}</Text>
              <Text style={styles.challengeXp}>+{item.xp} XP</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                item.done && styles.buttonDone,
              ]}
              onPress={() => handleComplete(item.id)}
              disabled={item.done}
            >
              <Text style={styles.buttonText}>
                {item.done ? "Concluído" : "Fazer"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* LEVEL UP */}
      {showLevelUp && (
        <View style={styles.overlay}>
          <Text style={styles.levelUp}>LEVEL UP 🚀</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },

  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
  },

  levelCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 14,
    borderRadius: 16,
  },

  level: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  progressText: {
    color: "#cbd5f5",
    fontSize: 13,
    marginTop: 2,
  },

  progressBarBg: {
    height: 8,
    backgroundColor: "#334155",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#6366f1",
  },

  next: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 6,
  },

  xpFloating: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "#22c55e",
    fontWeight: "bold",
  },

  challenge: {
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  challengeTitle: { color: "#fff" },

  challengeXp: {
    color: "#94a3b8",
    fontSize: 12,
  },

  button: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  buttonDone: {
    backgroundColor: "#475569",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  levelUp: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
});