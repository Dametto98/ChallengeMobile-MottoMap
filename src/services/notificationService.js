import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants'; 
import { apiJava } from './api';
import i18n from '../services/i18n';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const projectId = Constants.expoConfig?.extra?.eas?.projectId;

export async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert(i18n.t('alertError'), "Falha ao obter permissão para notificações!");
    return;
  }

  if (!projectId) {
    console.error("Erro ao obter o token de push: 'projectId' não encontrado no app.config.js. Verifique o bloco 'extra.eas.projectId'.");
    return;
  }

  try {
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: projectId, 
    })).data;
    console.log("Token de Push obtido:", token);
  } catch (e) {
    console.error("Erro ao obter o token de push:", e);
    return;
  }

  // Configurações para Android
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (token) {
    try {
      await apiJava.post('/usuario/register-token', { token: token });
      console.log("Token enviado para o backend com sucesso.");
    } catch (error) {
      console.error("Erro ao enviar o token para o backend:", error);
    }
  }
}