import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

const EditProfile: React.FC = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState("");
  const phoneNumber = "+52 646 521 4243";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleAddPhoto = () => {
    setIsModalVisible(true);
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
    setIsModalVisible(false);
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.addPhoto} onPress={handleAddPhoto}>
          <View style={styles.photoCircle}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.profileImage}
              />
            ) : (
              <Text style={styles.addPhotoText}>Agregar foto</Text>
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.photoText}>
          Introduce tu nombre y una foto de perfil (opcional)
        </Text>
        <Text style={styles.phoneLabel}>Nombre</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#888"
        />
        <Text style={styles.phoneLabel}>Apellido</Text>
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#888"
        />
        <Text style={styles.phoneLabel}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={user}
          onChangeText={setUser}
          placeholderTextColor="#888"
        />

        <View style={styles.phoneContainer}>
          <Text style={styles.phoneLabel}>Numero de telefono</Text>
          <Text style={styles.phoneValue}>{phoneNumber}</Text>
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit profile picture</Text>
            <TouchableOpacity style={styles.modalOption} onPress={takePhoto}>
              <FontAwesome name="camera" size={20} color="#fff" />
              <Text style={styles.modalOptionText}>Take photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={pickImage}>
              <FontAwesome name="image" size={20} color="#fff" />
              <Text style={styles.modalOptionText}>Choose from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#121212",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  addPhoto: {
    alignSelf: "center",
    marginBottom: 10,
  },
  photoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  addPhotoText: {
    color: "green",
    fontSize: 14,
  },
  photoText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  phoneContainer: {
    marginTop: 10,
  },
  phoneLabel: {
    color: "#888",
    fontSize: 14,
    marginBottom: 5,
  },
  phoneValue: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    backgroundColor: "#121212",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  modalOptionText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  modalCancel: {
    padding: 10,
    marginTop: 10,
    alignItems: "center",
  },
  modalCancelText: {
    color: "red",
    fontSize: 16,
  },
});

export default EditProfile;
