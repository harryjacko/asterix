import { Colors } from "@/shared/constants/colors";
import store from "@/store/configureStore";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    // Google Font, ref: https://fonts.google.com/specimen/Fira+Sans
    FiraSans: require("../../assets/fonts/FiraSans-Regular.ttf"),
    FiraSansSemiBold: require("../../assets/fonts/FiraSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const LogoTitle = styled.Image`
    height: 24px;
  `;
  const assets = {
    header: require("../../assets/images/headerlogo.png"),
  };

  return (
    <ThemeProvider value={DefaultTheme}>
      <Provider store={store}>
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.asterix.background,
              },
              headerTitle: () => (
                <LogoTitle resizeMode="contain" source={assets.header} />
              ),
            }}
          />
          <Stack.Screen
            name="upload"
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}
