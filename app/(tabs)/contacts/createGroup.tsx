import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter, useLocalSearchParams } from "expo-router";

interface Contacto {
  id: string;
  nombre: string;
  avatar: string;
}

const CreateGroupScreen: React.FC = () => {
  const router = useRouter();
  const { selectedContacts } = useLocalSearchParams();
  const [groupName, setGroupName] = useState("");

  const contactos: Contacto[] = selectedContacts
    ? JSON.parse(selectedContacts as string)
    : [];

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      alert("Por favor, ingresa un nombre para el grupo.");
      return;
    }
    alert(`Grupo "${groupName}" creado con ${contactos.length} miembros.`);
  };

  const renderContact = ({ item }: { item: Contacto }) => (
    <View style={styles.contactContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.contactName}>{item.nombre}</Text>
      <TouchableOpacity>
        <FontAwesome name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCreateGroup}>
          <Text style={styles.headerText}>Crear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.groupInputContainer}>
        <TouchableOpacity style={styles.groupImage}>
          <FontAwesome name="camera" size={24} color="#888" />
        </TouchableOpacity>
        <TextInput
          style={styles.groupInput}
          placeholder="Nombre del grupo"
          placeholderTextColor="#888"
          value={groupName}
          onChangeText={setGroupName}
        />
      </View>

      <Text style={styles.membersCount}>
        Miembros: {contactos.length} DE 1,023
      </Text>

      <FlatList
        data={contactos}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : `key-${index}`
        }
        renderItem={renderContact}
        style={styles.contactList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#121212",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerText: {
    color: "#008dd5",
    fontSize: 16,
  },
  groupInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121212",
    borderRadius: 10,
    padding: 10,
    margin: 15,
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  groupInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  membersCount: {
    color: "#888",
    fontSize: 14,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  contactList: {
    paddingHorizontal: 15,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  contactName: {
    color: "#fff",
    flex: 1,
    fontSize: 16,
  },
});

export default CreateGroupScreen;
