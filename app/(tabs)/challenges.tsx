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
    { id: "1", title: "Vai curintia", xp: 50, done: false },
    { id: "2", title: "Bater no coleguinha", xp: 100, done: false },
    { id: "3", title: "Platinar o Goat Souls 2", xp: 30, done: false },
    {
      id: "4",
      title: "Chorar na morte do Arthur morgan",
      xp: 130,
      done: false,
    },
    { id: "5", title: "Assitir Videos do Monark", xp: 190, done: false },
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

    const updated = challenges.map((c) =>
      c.id === id ? { ...c, done: true } : c,
    );

    setChallenges(updated);
  };

  // 🧠 LEVEL SYSTEM
  const currentXp = xp % XP_PER_LEVEL;
  const xpToNext = XP_PER_LEVEL - currentXp;
  const progress = (currentXp / XP_PER_LEVEL) * 100;

  // 🎬 XP ANIMATION
  const translateY = xpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
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
        duration: 2500,
        useNativeDriver: true,
      }).start(() => {
        levelAnim.setValue(0);
        setShowLevelUp(false);
      });
    }

    prevLevelRef.current = level;
  }, [level]);

  const rocketTranslate = levelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, -200],
  });

  const confettiFall = levelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 300],
  });

  const fadeOut = levelAnim.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [1, 1, 0],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desafios</Text>

      <View style={styles.card}>
        <View style={styles.levelRow}>
          <Text style={styles.levelText}>LVL {level}</Text>
          <Text style={styles.xpText}>
            {currentXp} / {XP_PER_LEVEL} XP
          </Text>
        </View>

        <Text style={styles.nextLevel}>
          Faltam {xpToNext} XP para o próximo nível
        </Text>

        {xpText !== "" && (
          <Animated.Text
            style={[
              styles.xpFloating,
              {
                transform: [{ translateY }],
                opacity,
              },
            ]}
          >
            {xpText}
          </Animated.Text>
        )}

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </View>

      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.challenge}>
            <View>
              <Text style={styles.challengeText}>{item.title}</Text>
              <Text style={styles.challengeXp}>+{item.xp} XP</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                item.done && { backgroundColor: "#475569" },
              ]}
              onPress={() => handleComplete(item.id)}
              disabled={item.done}
            >
              <Text style={styles.buttonText}>
                {item.done ? "Feito" : "Completar"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* 🚀 LEVEL UP EFFECT */}
      {showLevelUp && (
        <View style={styles.overlay}>
          <Animated.Text
            style={[
              styles.rocket,
              {
                transform: [{ translateY: rocketTranslate }],
                opacity: fadeOut,
              },
            ]}
          >
            🚀
          </Animated.Text>

          {[...Array(12)].map((_, i) => (
            <Animated.View
              key={i}
              style={[
                styles.confetti,
                {
                  left: Math.random() * 300,
                  transform: [{ translateY: confettiFall }],
                  opacity: fadeOut,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 16,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },

  levelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  levelText: {
    color: "#22c55e",
    fontWeight: "bold",
  },

  xpText: {
    color: "#fff",
  },

  nextLevel: {
    color: "#94a3b8",
    fontSize: 12,
    marginBottom: 8,
  },

  xpFloating: {
    position: "absolute",
    right: 16,
    top: 10,
    color: "#22c55e",
    fontWeight: "bold",
  },

  progressBarBackground: {
    height: 6,
    backgroundColor: "#334155",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#22c55e",
  },

  challenge: {
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  challengeText: {
    color: "#fff",
  },

  challengeXp: {
    color: "#94a3b8",
    fontSize: 12,
  },

  button: {
    backgroundColor: "#971313",
    padding: 8,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  },

  rocket: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    fontSize: 40,
  },

  confetti: {
    position: "absolute",
    top: 0,
    width: 6,
    height: 6,
    backgroundColor: "#22c55e",
    borderRadius: 2,
  },
});
