import { Stack } from "expo-router";
import "./global.css"
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return <>
  <StatusBar barStyle="dark-content" backgroundColor="transparent" />
  <Stack >
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="onboarding/onboarding" options={{ headerShown: false }} />
    <Stack.Screen name="login/login" options={{ headerShown: false }} />
    <Stack.Screen name="(tabs)"
      options={{
        headerShown: false,
      }} />
      <Stack.Screen name="messages/[id]"
      options={{
        headerShown: false,
      }} />
      <Stack.Screen name="profile/[id]"
      options={{
        headerShown: false,
      }} />
  </Stack>
  </>;
}
