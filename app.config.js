const { execSync } = require('child_process');
const myPackage = require('./package.json');

let commitHash;
try {
  commitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  console.warn('Não foi possível pegar o hash do commit, usando "unknown"');
  commitHash = 'unknown';
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
        "projectId": "389af45f-5ad5-4414-87e3-4c20e77a443d" 
    },

    extra: {
      commitHash: commitHash,
      appVersion: appVersion,
    },
    
    splash: {
      image: "./assets/images/mottomap-logo.png",
      resizeMode: "contain",
      backgroundColor: "#121212"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/mottomap-logo.png",
        backgroundColor: "#121212"
      },
      "package": "com.mottomap.app" 
    },
    web: {
      favicon: "./assets/images/mottomap-logo.png"
    }
  }
};
