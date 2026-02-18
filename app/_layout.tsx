import { EBGaramond_400Regular, EBGaramond_700Bold, useFonts } from '@expo-google-fonts/eb-garamond';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="credit-card-multiple-outline" style={styles.icon} />
              <Text style={styles.title}>BANCO</Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    letterSpacing: 0.1,
    fontFamily: 'EBGaramond_700Bold',
    color: '#40537e',
  },
  icon: {
    marginRight: 10,
    color: '#40537e',
    fontSize: 24,
  },
})