import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function PhoneVerification() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (phoneNumber.trim() === "") {
      alert("Por favor, ingresa tu número de teléfono.");
      return;
    }
    setIsModalVisible(true);
  };

  const handleEdit = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    router.push("/NumberVerification");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={require("@/assets/images/logo.png")} />
        <View style={styles.card}>
          <Text style={styles.title}>Ingresa tu número de teléfono</Text>
          <Text style={styles.subtitle}>
            WingChat necesitará verificar tu número de teléfono (es posible que
            tu operador aplique cargos).
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Introduce el número de teléfono"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>¿Este es el número correcto?</Text>
              <Text style={styles.modalPhoneNumber}>{phoneNumber}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleEdit}
                >
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmButtonText}>Sí</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#121212",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    borderRadius: 10,
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1E90FF",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer: {
    backgroundColor: "#121212",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  modalPhoneNumber: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 10,
    paddingVertical: 10,
    marginRight: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#1E90FF",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
