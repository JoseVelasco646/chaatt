import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chatScreen"
        options={{
          title: "Chats",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="InfoContact"
        options={{
          title: "Informacion del contacto",
        }}
      />
      <Stack.Screen
        name="OptionMedia"
        options={{
          title: "Archivos Compartidos",
        }}
      />
    </Stack>
  );
}
