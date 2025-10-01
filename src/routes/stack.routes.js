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
import EditarMotoScreen from '../screens/EditarMotoScreen';
import EditarFilialScreen from '../screens/EditarFilialScreen';
import RegistrarFilialScreen from '../screens/RegistrarFilialScreen';
import DetalhesFilialScreen from '../screens/DetalhesFilialScreen';
import MotosListScreen from '../screens/MotosListScreen';

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
      <Stack.Screen name="MotosList" component={MotosListScreen} options={{ title: 'Motos da Frota' }} />
      <Stack.Screen name="DetalhesMoto" component={DetalhesMotoScreen} options={{ title: 'Detalhes da Moto' }} />
      <Stack.Screen name="EditarMoto" component={EditarMotoScreen} options={{ title: 'Editar Moto' }} />
      <Stack.Screen name="Filiais" component={FiliaisScreen} options={{ title: 'Nossas Filiais' }} />
      <Stack.Screen name="DetalhesFilial" component={DetalhesFilialScreen} options={{ title: 'Detalhes da Filial' }} />
      <Stack.Screen name="RegistrarFilial" component={RegistrarFilialScreen} options={{ title: 'Registrar Nova Filial' }} />
      <Stack.Screen name="EditarFilial" component={EditarFilialScreen} options={{ title: 'Editar Filial' }} />
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