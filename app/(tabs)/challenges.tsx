import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function Challenges() {
  const { width, height } = useWindowDimensions();

  /*
   * Base do Figma:
   * aproximadamente 236px de largura.
   *
   * Tudo abaixo é calculado proporcionalmente à largura
   * disponível do aparelho.
   */
  const BASE_WIDTH = 236;
  const scale = width / BASE_WIDTH;

  // Evita que em tablets ou telas muito grandes tudo fique gigante
  const s = (value: number) =>
    Math.max(0.85, Math.min(value * scale, value * 1.35));

  const [xp, setXp] = useState(0);
  const [xpText, setXpText] = useState("");
  const [xpAnim] = useState(new Animated.Value(0));

  const [levelAnim] = useState(new Animated.Value(0));
  const [showLevelUp, setShowLevelUp] = useState(false);

  const XP_PER_LEVEL = 500;

  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const prevLevelRef = useRef(level);

  const [challenges, setChallenges] = useState([
    {
      id: "1",
      title: "Fazer 5 min de alongamento",
      xp: 100,
      done: false,
    },
    {
      id: "2",
      title: "Beber 1,5L de água",
      xp: 100,
      done: false,
    },
    {
      id: "3",
      title: "Estudar 1 hora",
      xp: 100,
      done: false,
    },
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
      prev.map((c) =>
        c.id === id ? { ...c, done: true } : c
      )
    );
  };

  const currentXp = xp % XP_PER_LEVEL;
  const xpToNext = XP_PER_LEVEL - currentXp;
  const progress = (currentXp / XP_PER_LEVEL) * 100;

  const translateY = xpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -s(25)],
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
      <LinearGradient
        colors={["#6B4A91", "#43247D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.background}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scroll,
            {
              paddingHorizontal: s(9),
              paddingTop: s(10),
              paddingBottom: s(80),
            },
          ]}
        >
          {/* HEADER */}

          <View
            style={[
              styles.header,
              {
                height: s(30),
                marginBottom: s(2),
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.menuButton,
                {
                  width: s(28),
                  height: s(28),
                  gap: s(4),
                },
              ]}
            >
              <View
                style={[
                  styles.menuLine,
                  {
                    width: s(19),
                    height: s(2.5),
                  },
                ]}
              />

              <View
                style={[
                  styles.menuLine,
                  {
                    width: s(19),
                    height: s(2.5),
                  },
                ]}
              />

              <View
                style={[
                  styles.menuLine,
                  {
                    width: s(19),
                    height: s(2.5),
                  },
                ]}
              />
            </TouchableOpacity>

            <View
              style={[
                styles.headerRight,
                {
                  gap: s(9),
                },
              ]}
            >
              <TouchableOpacity>
                <Text
                  style={[
                    styles.bell,
                    {
                      fontSize: s(16),
                    },
                  ]}
                >
                  🔔
                </Text>
              </TouchableOpacity>

              <View
                style={[
                  styles.headerAvatar,
                  {
                    width: s(29),
                    height: s(29),
                    borderRadius: s(15),
                    borderWidth: s(1.5),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.avatarFace,
                    {
                      fontSize: s(15),
                    },
                  ]}
                >
                  👤
                </Text>
              </View>
            </View>
          </View>

          {/* BEM-VINDO */}

          <View
            style={[
              styles.welcomeCard,
              {
                borderRadius: s(7),
                paddingHorizontal: s(9),
                paddingVertical: s(8),
                marginBottom: s(8),
              },
            ]}
          >
            <View style={styles.welcomeTop}>
              <View
                style={[
                  styles.welcomeAvatar,
                  {
                    width: s(34),
                    height: s(34),
                    borderRadius: s(18),
                    marginRight: s(7),
                    borderWidth: s(1.5),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.avatarFace,
                    {
                      fontSize: s(16),
                    },
                  ]}
                >
                  👤
                </Text>
              </View>

              <View style={styles.welcomeTexts}>
                <View style={styles.nameRow}>
                  <Text
                    style={[
                      styles.welcomeText,
                      {
                        fontSize: s(12),
                      },
                    ]}
                    numberOfLines={1}
                  >
                    Bem vindo, Wesley!
                  </Text>

                  <View
                    style={[
                      styles.levelBadge,
                      {
                        borderRadius: s(7),
                        paddingHorizontal: s(6),
                        paddingVertical: s(2),
                        marginLeft: s(6),
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.levelBadgeText,
                        {
                          fontSize: s(7),
                        },
                      ]}
                    >
                      Nível {level}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.welcomeSubtitle,
                    {
                      fontSize: s(8),
                      marginTop: s(2),
                    },
                  ]}
                  numberOfLines={1}
                >
                  Vamos evoluir seus objetivos hoje?
                </Text>
              </View>
            </View>

            {/* XP */}

            <View
              style={[
                styles.xpBarBackground,
                {
                  height: s(10),
                  borderRadius: s(10),
                  marginTop: s(8),
                },
              ]}
            >
              <View
                style={[
                  styles.xpBar,
                  {
                    width: `${progress}%`,
                    borderRadius: s(10),
                  },
                ]}
              />
            </View>

            <Text
              style={[
                styles.xpNext,
                {
                  fontSize: s(8),
                  marginTop: s(5),
                },
              ]}
            >
              {xpToNext} XP para o próximo nível
            </Text>

            {xpText !== "" && (
              <Animated.Text
                style={[
                  styles.xpFloating,
                  {
                    top: s(40),
                    right: s(10),
                    fontSize: s(12),
                    transform: [{ translateY }],
                    opacity,
                  },
                ]}
              >
                {xpText}
              </Animated.Text>
            )}
          </View>

          {/* TAREFAS */}

          <View
            style={[
              styles.tasksCard,
              {
                borderRadius: s(7),
                padding: s(9),
                marginBottom: s(12),
              },
            ]}
          >
            <Text
              style={[
                styles.tasksTitle,
                {
                  fontSize: s(13),
                  marginBottom: s(6),
                },
              ]}
            >
              Tarefas de Hoje
            </Text>

            {challenges.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.taskRow,
                  {
                    minHeight: s(32),
                  },
                ]}
                onPress={() => handleComplete(item.id)}
                disabled={item.done}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      width: s(28),
                      height: s(28),
                      borderRadius: s(7),
                      borderWidth: s(2.5),
                      marginRight: s(5),
                    },
                    item.done && styles.checkboxDone,
                  ]}
                >
                  {item.done && (
                    <Text
                      style={[
                        styles.check,
                        {
                          fontSize: s(16),
                        },
                      ]}
                    >
                      ✓
                    </Text>
                  )}
                </View>

                <Text
                  style={[
                    styles.taskText,
                    {
                      fontSize: s(9),
                    },
                    item.done && styles.taskTextDone,
                  ]}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>

                <View
                  style={[
                    styles.taskXp,
                    {
                      borderRadius: s(6),
                      paddingHorizontal: s(5),
                      paddingVertical: s(2),
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.taskXpText,
                      {
                        fontSize: s(7),
                      },
                    ]}
                  >
                    +{item.xp} XP
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* ESTATÍSTICAS */}

          <View
            style={[
              styles.statsRow,
              {
                gap: s(7),
                marginBottom: s(7),
              },
            ]}
          >
            <View
              style={[
                styles.streakCard,
                {
                  borderRadius: s(7),
                  padding: s(8),
                  height: s(55),
                },
              ]}
            >
              <Text
                style={[
                  styles.streakTitle,
                  {
                    fontSize: s(11),
                  },
                ]}
              >
                Sequência
              </Text>

              <View style={styles.streakContent}>
                <Text
                  style={[
                    styles.fire,
                    {
                      fontSize: s(23),
                      marginRight: s(5),
                    },
                  ]}
                >
                  🔥
                </Text>

                <Text
                  style={[
                    styles.streakNumber,
                    {
                      fontSize: s(11),
                    },
                  ]}
                >
                  7 dias
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.weekCard,
                {
                  borderRadius: s(7),
                  padding: s(8),
                  height: s(55),
                },
              ]}
            >
              <Text
                style={[
                  styles.weekTitle,
                  {
                    fontSize: s(8),
                  },
                ]}
              >
                XP ganho essa semana
              </Text>

              <Text
                style={[
                  styles.weekXp,
                  {
                    fontSize: s(15),
                    marginTop: s(2),
                  },
                ]}
              >
                +450xp
              </Text>
            </View>
          </View>

          {/* RANKING */}

          <Text
            style={[
              styles.rankingTitle,
              {
                fontSize: s(12),
                marginBottom: s(3),
              },
            ]}
          >
            Posição no ranking atual
          </Text>

          <View
            style={[
              styles.rankingCard,
              {
                height: s(77),
                borderRadius: s(7),
                paddingHorizontal: s(7),
              },
            ]}
          >
            <View
              style={[
                styles.rankingAvatar,
                {
                  width: s(62),
                  height: s(62),
                  borderRadius: s(31),
                  borderWidth: s(1.5),
                  marginRight: s(7),
                },
              ]}
            >
              <Text
                style={[
                  styles.bigAvatar,
                  {
                    fontSize: s(31),
                  },
                ]}
              >
                👤
              </Text>
            </View>

            <Text
              style={[
                styles.rankingPosition,
                {
                  fontSize: s(28),
                },
              ]}
            >
              8º
            </Text>

            <Text
              style={[
                styles.rankingXp,
                {
                  fontSize: s(17),
                  marginLeft: s(5),
                },
              ]}
            >
              2099xp
            </Text>
          </View>

          <View style={{ height: s(25) }} />
        </ScrollView>

        {/* BARRA INFERIOR */}

        <View
          style={[
            styles.bottomBar,
            {
              height: s(55),
            },
          ]}
        >
          <TouchableOpacity style={styles.bottomItem}>
            <Text
              style={[
                styles.bottomIcon,
                {
                  fontSize: s(17),
                },
              ]}
            >
              🏠
            </Text>

            <Text
              style={[
                styles.bottomText,
                {
                  fontSize: s(7),
                },
              ]}
            >
              Início
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomItem}>
            <Text
              style={[
                styles.bottomIcon,
                {
                  fontSize: s(17),
                },
              ]}
            >
              🎯
            </Text>

            <Text
              style={[
                styles.bottomText,
                {
                  fontSize: s(7),
                },
              ]}
            >
              Desafios
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomItem}>
            <Text
              style={[
                styles.bottomIcon,
                {
                  fontSize: s(17),
                },
              ]}
            >
              🏆
            </Text>

            <Text
              style={[
                styles.bottomText,
                {
                  fontSize: s(7),
                },
              ]}
            >
              Conquistas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomItem}>
            <Text
              style={[
                styles.bottomIcon,
                {
                  fontSize: s(17),
                },
              ]}
            >
              👤
            </Text>

            <Text
              style={[
                styles.bottomText,
                {
                  fontSize: s(7),
                },
              ]}
            >
              Perfil
            </Text>
          </TouchableOpacity>
        </View>

        {/* LEVEL UP */}

        {showLevelUp && (
          <View style={styles.overlay}>
            <View
              style={[
                styles.levelUpCard,
                {
                  paddingHorizontal: s(35),
                  paddingVertical: s(25),
                  borderRadius: s(20),
                },
              ]}
            >
              <Text
                style={[
                  styles.levelUpEmoji,
                  {
                    fontSize: s(38),
                    marginBottom: s(5),
                  },
                ]}
              >
                🚀
              </Text>

              <Text
                style={[
                  styles.levelUp,
                  {
                    fontSize: s(27),
                  },
                ]}
              >
                LEVEL UP
              </Text>

              <Text
                style={[
                  styles.levelUpText,
                  {
                    fontSize: s(11),
                    marginTop: s(5),
                  },
                ]}
              >
                Você chegou ao nível {level}!
              </Text>
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#45247D",
  },

  background: {
    flex: 1,
  },

  scroll: {
    paddingBottom: 80,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuButton: {
    justifyContent: "center",
  },

  menuLine: {
    backgroundColor: "#181126",
    borderRadius: 5,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  bell: {
    textAlign: "center",
  },

  headerAvatar: {
    backgroundColor: "#6C6BD6",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#B5A8FF",
  },

  avatarFace: {
    textAlign: "center",
  },

  /* WELCOME */

  welcomeCard: {
    backgroundColor: "#25193A",
    position: "relative",
  },

  welcomeTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  welcomeAvatar: {
    backgroundColor: "#6D6DD5",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#AAA2FF",
  },

  welcomeTexts: {
    flex: 1,
    minWidth: 0,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },

  welcomeText: {
    color: "#FFFFFF",
    fontWeight: "500",
    flexShrink: 1,
  },

  welcomeSubtitle: {
    color: "#BDB1CE",
  },

  levelBadge: {
    backgroundColor: "#9234D7",
    flexShrink: 0,
  },

  levelBadgeText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  xpBarBackground: {
    backgroundColor: "#57356F",
    overflow: "hidden",
  },

  xpBar: {
    height: "100%",
    backgroundColor: "#B832E5",
  },

  xpNext: {
    color: "#FFFFFF",
  },

  xpFloating: {
    position: "absolute",
    color: "#36D35B",
    fontWeight: "bold",
  },

  /* TAREFAS */

  tasksCard: {
    backgroundColor: "#25193A",
  },

  tasksTitle: {
    color: "#FFFFFF",
  },

  taskRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    borderColor: "#E5E0EC",
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxDone: {
    backgroundColor: "#7C3AED",
    borderColor: "#A78BFA",
  },

  check: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  taskText: {
    color: "#FFFFFF",
    flex: 1,
    minWidth: 0,
  },

  taskTextDone: {
    textDecorationLine: "line-through",
    color: "#9E94AB",
  },

  taskXp: {
    backgroundColor: "#15A638",
    flexShrink: 0,
  },

  taskXpText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  /* ESTATÍSTICAS */

  statsRow: {
    flexDirection: "row",
  },

  streakCard: {
    flex: 1,
    backgroundColor: "#FFB900",
  },

  streakTitle: {
    color: "#FF5B22",
  },

  streakContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  fire: {},

  streakNumber: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  weekCard: {
    flex: 1,
    backgroundColor: "#25193A",
    justifyContent: "center",
    alignItems: "center",
  },

  weekTitle: {
    color: "#FFFFFF",
    textAlign: "center",
  },

  weekXp: {
    color: "#B83CE5",
    fontWeight: "500",
  },

  /* RANKING */

  rankingTitle: {
    color: "#FFFFFF",
    textAlign: "center",
  },

  rankingCard: {
    backgroundColor: "#25193A",
    flexDirection: "row",
    alignItems: "center",
  },

  rankingAvatar: {
    backgroundColor: "#6D6DD5",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#9D96F4",
  },

  bigAvatar: {
    textAlign: "center",
  },

  rankingPosition: {
    color: "#B83CE5",
    fontWeight: "400",
  },

  rankingXp: {
    color: "#D4B7E8",
  },

  /* BARRA INFERIOR */

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#54248E",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#63339D",
  },

  bottomItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  bottomIcon: {
    textAlign: "center",
  },

  bottomText: {
    color: "#FFFFFF",
    marginTop: 2,
  },

  /* LEVEL UP */

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(20,10,35,0.65)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  levelUpCard: {
    backgroundColor: "#5B21B6",
    alignItems: "center",
  },

  levelUpEmoji: {},

  levelUp: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  levelUpText: {
    color: "#DDD6FE",
  },
});