const { execSync } = require("child_process");
const myPackage = require("./package.json");

let commitHash;
try {
  commitHash = execSync("git rev-parse --short HEAD").toString().trim();
} catch (e) {
  console.warn('Não foi possível pegar o hash do commit, usando "unknown"');
  commitHash = "unknown";
}

const appVersion = myPackage.version;

module.exports = {
  expo: {
    name: "MotoMap",
    slug: "MottoMap",
    version: appVersion,
    orientation: "portrait",
    icon: "./assets/images/mottomap-logo.png",
    plugins: [
      "expo-localization"
    ],

    extra: {
      commitHash: commitHash,
      appVersion: appVersion,
      "eas": {
        "projectId": "7a54977e-b8a7-4cca-b3a8-259f274c34ae"
      }
    },

    splash: {
      image: "./assets/images/mottomap-logo.png",
      resizeMode: "contain",
      backgroundColor: "#121212",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/mottomap-logo.png",
        backgroundColor: "#121212",
      },
      package: "com.mottomap.app",
      permissions: [
        "RECEIVE_BOOT_COMPLETED",
        "VIBRATE",
      ],
    },
    web: {
      favicon: "./assets/images/mottomap-logo.png",
    },
  },
};
