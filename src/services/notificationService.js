import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { apiJava } from './api'; // Importamos nossa API
import i18n from './i18n'; // Para traduzir as mensagens

// Define como as notificações devem se comportar com o app aberto
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  // if (!Device.isDevice) {
  //   console.warn("Push Notifications só funcionam em dispositivos físicos.");
  //   return;
  // }

  // Pede permissão
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

  // Obtém o Token de Push do Expo
  try {
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: '389af45f-5ad5-4414-87e3-4c20e77a443d', 
    })).data;
    console.log("Token de Push obtido:", token);
  } catch (e) {
    console.error("Erro ao obter o token de push:", e);
    return;
  }

  // Configurações para Android (canal de notificação)
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // Envia o token para o seu backend Java
  if (token) {
    try {
      await apiJava.post('/usuario/register-token', { token: token });
      console.log("Token enviado para o backend com sucesso.");
    } catch (error) {
      console.error("Erro ao enviar o token para o backend:", error);
    }
  }
}