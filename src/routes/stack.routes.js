import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

import LoginScreen from "../screens/LoginScreen";
import CadastroScreen from "../screens/CadastroScreen";
import HomeScreen from "../screens/HomeScreen";
import MotosListScreen from "../screens/MotosListScreen";
import RegistrarMotoScreen from "../screens/RegistrarMotoScreen";
import DetalhesMotoScreen from "../screens/DetalhesMotoScreen";
import EditarMotoScreen from "../screens/EditarMotoScreen";
import FiliaisScreen from "../screens/FiliaisScreen";
import DetalhesFilialScreen from "../screens/DetalhesFilialScreen";
import RegistrarFilialScreen from "../screens/RegistrarFilialScreen";
import EditarFilialScreen from "../screens/EditarFilialScreen";
import PatioVisualizacaoScreen from "../screens/PatioVisualization";

const Stack = createNativeStackNavigator();

function AuthRoutes() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastro"
        component={CadastroScreen}
        options={{ title: "Crie sua Conta" }}
      />
    </Stack.Navigator>
  );
}

function AppRoutes() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Painel de Controle" }}
      />
      <Stack.Screen
        name="MotosList"
        component={MotosListScreen}
        options={{ title: "Motos da Frota" }}
      />
      <Stack.Screen
        name="RegistrarMoto"
        component={RegistrarMotoScreen}
        options={{ title: "Registrar Nova Moto" }}
      />
      <Stack.Screen
        name="DetalhesMoto"
        component={DetalhesMotoScreen}
        options={{ title: "Detalhes da Moto" }}
      />
      <Stack.Screen
        name="EditarMoto"
        component={EditarMotoScreen}
        options={{ title: "Editar Moto" }}
      />
      <Stack.Screen
        name="Filiais"
        component={FiliaisScreen}
        options={{ title: "Nossas Filiais" }}
      />
      <Stack.Screen
        name="DetalhesFilial"
        component={DetalhesFilialScreen}
        options={{ title: "Detalhes da Filial" }}
      />
      <Stack.Screen
        name="RegistrarFilial"
        component={RegistrarFilialScreen}
        options={{ title: "Nova Filial" }}
      />
      <Stack.Screen
        name="EditarFilial"
        component={EditarFilialScreen}
        options={{ title: "Editar Filial" }}
      />
      <Stack.Screen
        name="PatioVisualizacao"
        component={PatioVisualizacaoScreen}
        options={{ title: "Visualização do Pátio" }}
      />
    </Stack.Navigator>
  );
}

export default function StackNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
