import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

export default function ProfileInfo() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Se requiere acceso a la cámara.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
    setIsModalVisible(false);
  };

  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Se requiere acceso a la galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
    setIsModalVisible(false);
  };

  const handleNext = () => {
    if (!name || !username) {
      alert("Por favor, completa ambos campos.");
      return;
    }
    router.push("/(tabs)/chats");
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.iconBackground}>
              <FontAwesome name="camera" size={24} color="#fff" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Información de perfil</Text>

      <Text style={styles.subtitle}>
        Pon tu nombre y añade una foto de perfil
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        placeholderTextColor="#888"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <FontAwesome name="arrow-right" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Elige una foto</Text>
            <TouchableOpacity style={styles.modalOption} onPress={openCamera}>
              <FontAwesome name="camera" size={20} color="#fff" />
              <Text style={styles.modalOptionText}>Tomar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={openGallery}>
              <FontAwesome name="image" size={20} color="#fff" />
              <Text style={styles.modalOptionText}>Subir desde galería</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.termsText}>
        Al registrarte, aceptas los{" "}
        <Text style={styles.linkText}>términos de servicio</Text>.
      </Text>
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
  iconContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
    borderWidth: 1,
    borderColor: "#1E90FF",
  },
  nextButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    right: 20,
  },
  termsText: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
  },
  linkText: {
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  modalOptionText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  modalCancel: {
    marginTop: 15,
    paddingVertical: 10,
    alignItems: "center",
    width: "100%",
  },
  modalCancelText: {
    color: "#1E90FF",
    fontSize: 16,
  },
});
