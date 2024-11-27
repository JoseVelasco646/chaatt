import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  const handlePrivacyPolicy = () => {
    Linking.openURL("https://www.example.com/privacy-policy");
  };

  const handleTermsOfService = () => {
    Linking.openURL("https://www.example.com/terms-of-service");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Te damos la bienvenida a WingChat</Text>
      <Text style={styles.subtitle}>
        <Text style={styles.link} onPress={handlePrivacyPolicy}>
          Política de privacidad
        </Text>
        <Text style={styles.link} onPress={handleTermsOfService}>
          Aceptar y continuar
        </Text>{" "}
        para aceptar las Condiciones del servicio.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/telefono")}
      >
        <Text style={styles.buttonText}>Aceptar y continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
  },
  link: {
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
