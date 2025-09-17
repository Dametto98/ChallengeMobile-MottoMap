import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen'; 

import DetalhesMotoScreen from '../screens/DetalhesMotoScreen';
import FiliaisScreen from '../screens/FiliaisScreen';
import HomeScreen from '../screens/HomeScreen';
import PatioVisualizacaoScreen from '../screens/PatioVisualization';
import RegistrarMotoScreen from '../screens/RegistrarMotoScreen';

const Stack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      {<Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Crie sua Conta' }} />}
    </Stack.Navigator>
  );
}

function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'MotoMap - Início' }} />
      <Stack.Screen name="PatioVisualizacao" component={PatioVisualizacaoScreen} options={{ title: 'Visualização do Pátio' }} />
      <Stack.Screen name="RegistrarMoto" component={RegistrarMotoScreen} options={{ title: 'Registrar Nova Moto' }} />
      <Stack.Screen name="DetalhesMoto" component={DetalhesMotoScreen} options={{ title: 'Detalhes da Moto' }} />
      <Stack.Screen name="Filiais" component={FiliaisScreen} options={{ title: 'Nossas Filiais' }} />
    </Stack.Navigator>
  );
}

export default function StackNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}