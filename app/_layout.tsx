import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="telefono" options={{ headerShown: false }} />

      <Stack.Screen
        name="NumberVerification"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}
