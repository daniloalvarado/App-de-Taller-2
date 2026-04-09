import { ModalProvider } from "@/contexts/ModalContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { tamaguiConfig } from "@/tamagui.config";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { PortalProvider, TamaguiProvider } from "tamagui";

// 1. LEER LA LLAVE (Agregamos esto)
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Falta la Publishable Key. Asegúrate de tener EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY en tu .env'
  );
}

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#08130D',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      {/* 2. PASAR LA LLAVE AQUÍ (Agregamos la prop publishableKey) */}
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <TamaguiProvider config={tamaguiConfig}>
          <PortalProvider shouldAddRootHost>
            <ModalProvider>
              <ThemeProvider
                value={colorScheme === "dark" ? CustomDarkTheme : CustomDarkTheme}
              >
                <View style={{ flex: 1, backgroundColor: '#08130D' }}>
                  <Slot />
                </View>
              </ThemeProvider>
            </ModalProvider>
          </PortalProvider>
        </TamaguiProvider>
      </ClerkProvider>
    </SafeAreaProvider>
  );
}