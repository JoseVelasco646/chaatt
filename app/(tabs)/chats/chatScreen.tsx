import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { io } from "socket.io-client";
import uuid from "react-native-uuid";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

interface Message {
  id: string;
  sender: string;
  message?: string;
  imageUri?: string;
  timestamp: string;
  audioUri?: string;
}
const socket = io("http://140.10.0.175:3000");

const ChatScreen = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    };
    getCameraPermission();

    const onReceiveMessage = (mensaje: Message) => {
      setMessages((prevMessages) => [mensaje, ...prevMessages]);
    };

    socket.on("recibirMensaje", onReceiveMessage);

    return () => {
      socket.off("recibirMensaje", onReceiveMessage);
      socket.close();
    };
  }, [router]);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Se requiere acceso al micrófono.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error("Error al iniciar la grabación:", error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        setIsRecording(false);
        await recording.stopAndUnloadAsync();

        const uri = recording.getURI();
        console.log("Audio guardado en:", uri);

        const newMsg: Message = {
          id: uuid.v4().toString(),
          sender: "Me",
          audioUri: uri,
          timestamp: new Date().toLocaleTimeString(),
        };

        socket.emit("enviarMensaje", newMsg);
        setMessages((prevMessages) => [newMsg, ...prevMessages]);
        setRecording(null);
      }
    } catch (error) {
      console.error("Error al detener la grabación:", error);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: uuid.v4().toString(),
        sender: "Me",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };

      socket.emit("enviarMensaje", newMsg);
      setMessages((prevMessages) => [newMsg, ...prevMessages]);
      setNewMessage("");
    }
  };

  const openCamera = async () => {
    if (hasCameraPermission) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newMsg: Message = {
          id: uuid.v4().toString(),
          sender: "Me",
          imageUri: result.assets[0].uri,
          timestamp: new Date().toLocaleTimeString(),
        };

        socket.emit("enviarMensaje", newMsg);
        setMessages((prevMessages) => [newMsg, ...prevMessages]);
      }
    } else {
      alert("Permiso de cámara denegado");
    }
  };

  const goToUserProfile = () => {
    router.push("/chats/InfoContact");
  };

  const deleteMessage = (id: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };

  const confirmDeleteMessage = (id: string) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que quieres eliminar este mensaje?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => deleteMessage(id),
          style: "destructive",
        },
      ]
    );
  };
  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newMsg: Message = {
        id: uuid.v4().toString(),
        sender: "Me",
        imageUri: result.assets[0].uri,
        timestamp: new Date().toLocaleTimeString(),
      };

      socket.emit("enviarMensaje", newMsg);
      setMessages((prevMessages) => [newMsg, ...prevMessages]);
    }
  };

  const playAudio = async (uri: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error al reproducir audio:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Modal visible={isModalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.fullscreenImage}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome
              name="arrow-left"
              size={20}
              color="#fff"
              style={styles.backButton}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToUserProfile}>
            <Image
              source={{
                uri: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.centerContainer}
            onPress={goToUserProfile}
          >
            <Text style={styles.userName}>Jose Velasco</Text>
            <Text style={styles.lastSeen}>últ. vez recientemente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.messageContainer,
              item.sender === "Me"
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}
            onLongPress={() => confirmDeleteMessage(item.id)}
          >
            {item.audioUri ? (
              <TouchableOpacity
                onPress={() => playAudio(item.audioUri)}
                style={styles.audioButton}
              >
                <FontAwesome name="play" size={20} color="#fff" />
                <Text style={styles.audioText}>Reproducir audio</Text>
              </TouchableOpacity>
            ) : item.imageUri ? (
              <TouchableOpacity
                onPress={() => {
                  setSelectedImage(item.imageUri);
                  setIsModalVisible(true);
                }}
              >
                <Image
                  source={{ uri: item.imageUri }}
                  style={styles.messageImage}
                />
              </TouchableOpacity>
            ) : (
              <Text style={styles.messageText}>{item.message}</Text>
            )}
            <View style={styles.messageMeta}>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
              {item.sender === "Me" && (
                <FontAwesome name="check" size={12} color="#4caf50" />
              )}
            </View>
          </Pressable>
        )}
        inverted
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputBar}>
          <TouchableOpacity onPress={openImagePicker}>
            <FontAwesome name="plus" size={20} color="#fff" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Escribe un mensaje"
            placeholderTextColor="#888"
            value={newMessage}
            onChangeText={setNewMessage}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={openCamera}>
              <FontAwesome
                name="camera"
                size={20}
                color="#fff"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={isRecording ? stopRecording : startRecording}
            >
              <FontAwesome
                name={isRecording ? "stop" : "microphone"}
                size={20}
                color={isRecording ? "red" : "#fff"}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1f1f1f",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    marginRight: 15,
    marginLeft: 10,
  },
  lastSeen: {
    color: "#888",
    fontSize: 12,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0084ff",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#1f1f1f",
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  messageMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  timestamp: {
    color: "#ccc",
    fontSize: 10,
    marginRight: 5,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1f1f1f",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  input: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#2a2a2a",
    color: "#fff",
  },
  icon: {
    marginLeft: 10,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  audioText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ChatScreen;
