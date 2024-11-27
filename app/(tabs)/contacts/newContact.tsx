import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const RegisterUser: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreate = () => {
    if (!firstName || !lastName || !username) {
      alert("Por favor completa todos los campos");
      return;
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setFirstName("");
    setLastName("");
    setUsername("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerButton}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCreate}>
          <Text style={styles.headerButton}>Crear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#888"
          value={firstName}
          onChangeText={setFirstName}
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
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <FontAwesome name="close" size={20} color="#fff" />
            </TouchableOpacity>

            <View style={styles.modalContent}>
              <FontAwesome
                name="user-circle"
                size={80}
                color="#fdd835"
                style={styles.avatar}
              />
              <Text style={styles.modalName}>{`${firstName} ${lastName}`}</Text>
              <View style={styles.usernameContainer}>
                <Text style={styles.modalLabel}>username</Text>
                <Text style={styles.modalUsername}>{`@${username}`}</Text>
              </View>
            </View>
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
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  headerButton: {
    color: "#008dd5",
    fontSize: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  form: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#1f1f1f",
    color: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#121212",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  modalContent: {
    alignItems: "center",
  },
  avatar: {
    marginBottom: 20,
  },
  modalName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  usernameContainer: {
    backgroundColor: "#1f1f1f",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  modalLabel: {
    color: "#888",
    fontSize: 12,
  },
  modalUsername: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterUser;
