import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import "../global.css";
import { Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import {Feather,FontAwesome,FontAwesome6 } from "@expo/vector-icons"
import { appThemeColors, appThemes } from "@/theme/app.theme";
import { StatusBar } from "expo-status-bar";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync()

const navigationTheme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: appThemeColors.light.background,
    },
  },
  dark: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: appThemeColors.dark.background,
    },
  },
};

export default function RootLayout() {
  const [loaded,error]=useFonts({
    ...Feather.font,
    ...FontAwesome.font,
    ...FontAwesome6.font,
    Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  })
  const [appReady,setAppReady]=useState(false)
  const { colorScheme } = useColorScheme();
  const scheme = colorScheme ?? "light";
  const backgroundColor = appThemeColors[scheme].background;

  const fontReady=loaded || !!error
  useEffect(()=>{
    if(!appReady  &&  fontReady){
      SplashScreen.hideAsync().then(()=>setAppReady(true))
    }
  },[appReady,fontReady])
  if(!appReady) return null
  return (
    <ThemeProvider value={navigationTheme[scheme]}>
      <View
        style={[
          appThemes[scheme],
          {
            backgroundColor,
            flex: 1,
          },
        ]}
      >
        <StatusBar key={scheme} animated style={scheme === "dark" ? "light" : "dark"} />
       <Stack screenOptions={{
        headerShown:false
       }}>

        <Stack.Screen name="(public)"/>
       </Stack>
      </View>
    </ThemeProvider>
  );
}
