import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { colors } from "../constants/theme";

// Evita que la splash screen se oculte sola antes de cargar las fuentes
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Mientras las fuentes no estén listas, no renderizamos nada
  // (la splash screen se mantiene visible gracias al preventAutoHideAsync)
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.secondary,
        headerTitleStyle: { fontFamily: "Poppins_700Bold" },
        contentStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="mascotas/nueva" options={{ title: "Agregar Mascota" }} />
    </Stack>
  );
}
