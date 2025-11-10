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

let projectId;
try {
  projectId = Constants.expoConfig?.extra?.eas?.projectId;
} catch (error) {
  console.warn('[notificationService] Erro ao obter projectId:', error);
}

export async function registerForPushNotificationsAsync() {
  try {
    let token;

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.warn('[notificationService] Permissão de notificação negada');
        return;
      }
    } catch (error) {
      console.warn('[notificationService] Erro ao solicitar permissões:', error);
      return;
    }

    if (!projectId) {
      console.warn("[notificationService] 'projectId' não encontrado no app.config.js. Notificações push não serão registradas.");
      return;
    }

    try {
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: projectId, 
      })).data;
      console.log("[notificationService] Token de Push obtido:", token);
    } catch (e) {
      console.error("[notificationService] Erro ao obter o token de push:", e);
      return;
    }

    // Configurações para Android
    if (Platform.OS === 'android') {
      try {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      } catch (error) {
        console.warn('[notificationService] Erro ao configurar canal de notificação Android:', error);
      }
    }

    if (token) {
      try {
        await apiJava.post('/usuario/register-token', { token: token });
        console.log("[notificationService] Token enviado para o backend com sucesso.");
      } catch (error) {
        console.error("[notificationService] Erro ao enviar o token para o backend:", error);
        // Não lança erro, apenas loga, para não quebrar o fluxo de login
      }
    }
  } catch (error) {
    console.error("[notificationService] Erro geral no registro de notificações:", error);
    // Não lança erro para não quebrar o fluxo de login
  }
}