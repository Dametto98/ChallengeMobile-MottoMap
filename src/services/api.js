import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_JAVA_URL = "https://mottomap-api.onrender.com"; //Conexão com a API no render

const apiJava = axios.create({
  baseURL: API_JAVA_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiJava.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@MottoMap:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { apiJava };
