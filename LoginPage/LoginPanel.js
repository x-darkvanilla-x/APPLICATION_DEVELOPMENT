import * as React from "react";
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

import { useNavigation } from "@react-navigation/native";

const buttons = [
  {
    icon: "facebook",
    iconColor: "white",
    backgroundColor: "#1877F2",
    size: 20,
    onPress: () => console.log("Pressed Facebook"),
  },
  {
    icon: "google-plus",
    iconColor: "white",
    backgroundColor: "#EA4335",
    size: 20,
    onPress: () => console.log("Pressed Google Plus"),
  },
  {
    icon: "linkedin",
    iconColor: "white",
    backgroundColor: "#0077b5",
    size: 20,
    onPress: () => console.log("Pressed LinkedIn"),
  },
];

export const LoginPanel = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
    <View style={styles.main}>
      <Image
        source={{
          uri: "https://assets-global.website-files.com/60658b46b03f0cf83ac1485d/62ac4187101a6a559b5da7ce_1393438_Social%20Login%20Feature%20Page%20Hero%20Image_v1_061622.png",
        }}
        style={{ width: "100%", aspectRatio: "1/1" }}
      />
      <Text variant="displaySmall" style={styles.bold}>
        Hello
      </Text>
      <Text variant="titleLarge">Welcome to Pizzle</Text>
      <Button
        style={{
          backgroundColor: "#0E86D4",
          width: "100%",
          borderRadius: 50,
          borderColor: "#0E86D4",
          borderWidth: 2,
          ":active": {
            backgroundColor: "#fff",
          },
        }}
        onPress={() => {navigation.navigate("Login")}}
      >
        <Text variant="titleLarge" style={{ color: "white" }}>
          Login
        </Text>
      </Button>
      <Button
        style={{
          width: "100%",
          borderColor: "#0E86D4",
          borderWidth: 2,
          borderRadius: 50,
        }}
        onPress={() => {navigation.navigate("Sign Up");}}
      >
        <Text variant="titleLarge">Sign Up</Text>
      </Button>
      <Text variant="bodyMedium">Sign Up Using</Text>
      <View style={{ flexDirection: "row" }}>
        {buttons.map((button, index) => (
          <IconButton
            key={index}
            icon={button.icon}
            iconColor={button.iconColor}
            backgroundColor={button.backgroundColor}
            size={button.size}
            onPress={button.onPress}
          />
        ))}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 50,
    gap: 20,
    height: "100%",
  },
  bold: {
    fontWeight: "bold",
  },
});
