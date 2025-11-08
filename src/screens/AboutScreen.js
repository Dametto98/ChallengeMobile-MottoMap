import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView, // 1. IMPORTAMOS O SCROLLVIEW
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import Constants from "expo-constants";

export default function AboutScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(colors);

  const developers = [
    { name: "Guilherme Janunzi", rm: "558461", githubUser: "GuiJanunzzi" },
    { name: "Caike Dametto", rm: "558614", githubUser: "Dametto98" },
  ];

  const appVersion = Constants.expoConfig.extra.appVersion || "1.0.0";
  const commitHash = Constants.expoConfig.extra.commitHash || "N/A";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../../assets/images/mottomap-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>MotoMap</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t("aboutAppVersion")}:</Text>
            <Text style={styles.infoValue}>{appVersion}</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.infoLabel}>{t("aboutCommitHash")}:</Text>
            <Text style={styles.infoValue}>{commitHash}</Text>
          </View>
        </View>

        <Text style={styles.developersTitle}>{t("aboutDevelopersTitle")}</Text>
        {developers.map((dev) => (
          <View key={dev.rm} style={styles.devCard}>
            <Image
              source={{ uri: `https://github.com/${dev.githubUser}.png` }}
              style={styles.devAvatar}
            />
            <View style={styles.devInfo}>
              <Text style={styles.devName}>{dev.name}</Text>
              <Text style={styles.devRm}>RM: {dev.rm}</Text>
              <Text style={styles.devGithub}>@{dev.githubUser}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// 5. ESTILOS ATUALIZADOS
const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      alignItems: "center",
      padding: 20,
      paddingBottom: 40, 
    },
    logo: {
      width: 120, 
      height: 120,
      marginTop: 20, 
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 25,
    },
    infoCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 20, 
      paddingVertical: 5, 
      width: "100%",
      borderColor: colors.border,
      borderWidth: 1,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    infoLabel: {
      fontSize: 16,
      color: colors.textSecondary,
      fontWeight: "bold",
    },
    infoValue: {
      fontSize: 14, 
      color: colors.text,
      fontFamily: "monospace",
      flexShrink: 1, 
      textAlign: "right",
    },

    developersTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
      marginTop: 35,
      marginBottom: 15,
      alignSelf: "flex-start", 
    },
    devCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 15,
      marginBottom: 12,
      borderColor: colors.border,
      borderWidth: 1,
      width: "100%",
    },
    devAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30, 
      marginRight: 15,
      backgroundColor: colors.border, 
    },
    devInfo: {
      flex: 1,
    },
    devName: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
    },
    devRm: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    devGithub: {
      fontSize: 14,
      color: colors.primary, 
      marginTop: 2,
    },
  });
