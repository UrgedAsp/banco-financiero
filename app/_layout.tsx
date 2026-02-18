import { EBGaramond_400Regular, EBGaramond_700Bold, useFonts } from '@expo-google-fonts/eb-garamond';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="credit-card-multiple-outline" style={styles.icon} />
                  <Text style={styles.title}>BANCO</Text>
                </View>
              ),
              headerTitleAlign: 'center',
              headerBackVisible: false
            }}
          >
          </Stack>
        </QueryClientProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
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