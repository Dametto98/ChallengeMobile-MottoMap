import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_JAVA_URL = 'http://10.0.2.2:8080';//conexão utilizando o emulador tem que usar esse IP

const apiJava = axios.create({
  baseURL: API_JAVA_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token em todas as requisições
apiJava.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@MottoMap:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { apiJava };