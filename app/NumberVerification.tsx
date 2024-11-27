import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const NumberVerification: React.FC = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();

  const handleInputChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    } else if (index === 3 && text) {
      inputs.current[index]?.blur();
      handleVerify(newCode);
    }

    setCode(newCode);
  };

  const handleVerify = (newCode: string[]) => {
    const verificationCode = newCode.join("");
    if (verificationCode.length === 4) {
      router.push("/register");
    } else {
      alert("Por favor, completa el código.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificación de tu número</Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            value={digit}
            onChangeText={(text) => handleInputChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={(el) => (inputs.current[index] = el)}
          />
        ))}
      </View>
    </View>
  );
};

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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    maxWidth: 300,
  },
  input: {
    backgroundColor: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#1E90FF",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    width: 50,
    height: 50,
    marginHorizontal: 5,
  },
});

export default NumberVerification;
