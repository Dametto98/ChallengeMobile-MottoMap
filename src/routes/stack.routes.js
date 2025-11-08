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
import { useTranslation } from 'react-i18next';
import RegistrarProblemaScreen from '../screens/RegistrarProblemaScreen';
import EditarProblemaScreen from '../screens/EditarProblemaScreen';
import ProblemasListScreen from '../screens/ProblemasListScreen';

const Stack = createNativeStackNavigator();

function AuthRoutes() {
  const { colors } = useTheme();
  const { t } = useTranslation();

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
        options={{ title: t('titleCreateAccount') }}
      />
    </Stack.Navigator>
  );
}

function AppRoutes() {
  const { colors } = useTheme();
  const { t } = useTranslation();

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
        options={{ title: t('titleDashboard') }}
      />
      <Stack.Screen
        name="MotosList"
        component={MotosListScreen}
        options={{ title: t('titleMotosList') }}
      />
      <Stack.Screen
        name="RegistrarMoto"
        component={RegistrarMotoScreen}
        options={{ title: t('titleRegisterMoto') }}
      />
      <Stack.Screen
        name="DetalhesMoto"
        component={DetalhesMotoScreen}
        options={{ title: t('titleDetalhesMoto') }}
      />
      <Stack.Screen
        name="EditarMoto"
        component={EditarMotoScreen}
        options={{ title: t('titleEditarMoto') }}
      />
      <Stack.Screen
        name="Filiais"
        component={FiliaisScreen}
        options={{ title: t('titleFiliais') }}
      />
      <Stack.Screen
        name="DetalhesFilial"
        component={DetalhesFilialScreen}
        options={{ title: t('titleDetalhesFilial') }}
      />
      <Stack.Screen
        name="RegistrarFilial"
        component={RegistrarFilialScreen}
        options={{ title: t('titleRegisterFilial') }}
      />
      <Stack.Screen
        name="EditarFilial"
        component={EditarFilialScreen}
        options={{ title: t('titleEditarFilial') }}
      />
      <Stack.Screen
        name="PatioVisualizacao"
        component={PatioVisualizacaoScreen}
        options={{ title: t('titlePatio') }}
      />
      <Stack.Screen 
        name="RegistrarProblema" 
        component={RegistrarProblemaScreen} 
        options={{ title: t('titleReportProblem') 
      }}/>
      <Stack.Screen 
        name="EditarProblema" 
        component={EditarProblemaScreen} 
        options={{ title: t('titleEditarProblema') }} 
      />
      <Stack.Screen 
        name="ProblemasList" 
        component={ProblemasListScreen} 
        options={{ title: t('labelProblemasList') }} 
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
