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

    eas: {
      projectId: "93e7bc80-ba2e-4c4c-9118-e9dac5071fc1",
    },

    extra: {
      commitHash: commitHash,
      appVersion: appVersion,
      eas: {
        projectId: "93e7bc80-ba2e-4c4c-9118-e9dac5071fc1",
      },
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
    },
    web: {
      favicon: "./assets/images/mottomap-logo.png",
    },
  },
};
