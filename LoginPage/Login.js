import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Text,
  TextInput,
  IconButton,
} from "react-native-paper";

const { height: windowHeight } = Dimensions.get("window");

const Login = () => {
  const [secureText, setSecureText] = useState(true);

  return (
    <ScrollView>
      <View style={styles.main}>
        <Image
          source={{
            uri: "https://cdni.iconscout.com/illustration/premium/thumb/mobile-login-5650377-4707996.png",
          }}
          style={{ width: "80%", aspectRatio: "1/1" }}
        />
        <Text variant="displaySmall" style={styles.bold}>
          Login Details
        </Text>
        <View style={{ width: "100%", gap: 30 }}>
          <TextInput
            secureTextEntry
            left={<TextInput.Icon icon="email" />}
            mode="outlined" // Use the outlined mode
            style={{
              width: "100%",
              backgroundColor: "transparent",
            }}
            placeholder="Email"
            theme={{ colors: { primary: "#0E86D4" } }} // Primary color for focused state
          />

          <TextInput
            left={<TextInput.Icon icon="key" />}
            right={
              <TextInput.Icon
                icon={secureText ? "eye-off" : "eye"}
                onPress={() => setSecureText(!secureText)}
              />
            }
            mode="outlined" // Use the outlined mode
            style={{
              width: "100%",
              backgroundColor: "transparent",
            }}
            placeholder="Password"
            secureTextEntry={secureText}
            theme={{ colors: { primary: "#0E86D4" } }} // Primary color for focused state
          />
          <Text variant="titleMedium" style={{ textAlign: "right" }}>
            Forgot Password?
          </Text>
        </View>

        <Button
          style={{
            backgroundColor: "#0E86D4",
            width: "80%",
            borderRadius: 50,
            borderColor: "#0E86D4",
            borderWidth: 2,
          }}
        >
          <Text variant="titleLarge" style={{ color: "white" }}>
            Login
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 50,
    gap: 50,
    height: "100%"
  },
  bold: {
    fontWeight: "bold",
  },
});

export default Login;
