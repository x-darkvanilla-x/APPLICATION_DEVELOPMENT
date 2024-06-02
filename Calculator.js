import React, { useState } from "react";
import { StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import { Button, Text, TextInput, Card, IconButton } from "react-native-paper";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState("");

  const handlePress = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setQuestion("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleEqual = () => {
    try {
      setQuestion(input);
      setInput(eval(input).toString());
    } catch (e) {
      Alert.alert("Invalid input");
    }
  };

  const handlePercentage = () => {
    if (input) {
      setInput((prev) => (parseFloat(prev) / 100).toString());
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Text variant="titleLarge" style={styles.input}>
          {question}
        </Text>
        <Text variant="displayLarge" style={styles.input}>
          {input}
        </Text>
      </View>

      <View style={{ borderRadius: 15, overflow: "hidden" }}>
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.7}
            mode="contained"
            style={{
              flex: 1,
              margin: 2,
              borderRadius: 0,
              backgroundColor: "#686e78",
              justifyContent: "center",
              alignItems: "center",
            }}
            backgroundColor="#0060e5"
            onPress={handleClear}
          >
            <Text variant="headlineLarge" style={styles.text}>
              AC
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            mode="contained"
            style={{
              flex: 1,
              margin: 2,
              borderRadius: 0,
              backgroundColor: "#686e78",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleBackspace}
          >
            <Text variant="headlineLarge" style={styles.text}>
              ⌫
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            mode="contained"
            style={{
              flex: 1,
              margin: 2,
              borderRadius: 0,
              backgroundColor: "#686e78",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handlePercentage}
          >
            <Text variant="headlineLarge" style={styles.text}>
              %
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            mode="contained"
            style={styles.buttonOperator}
            onPress={() => handlePress("/")}
          >
            <Text variant="headlineLarge" style={styles.text}>
              ÷
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          {["7", "8", "9", "*"].map((value) => (
            <TouchableOpacity
              activeOpacity={0.7}
              mode="contained"
              style={value != "*" ? styles.button : styles.buttonOperator}
              onPress={() => handlePress(value)}
              key={value}
            >
              <Text variant="headlineLarge" style={styles.text}>
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {["4", "5", "6", "-"].map((value) => (
            <TouchableOpacity
              activeOpacity={0.7}
              mode="contained"
              style={value != "-" ? styles.button : styles.buttonOperator}
              onPress={() => handlePress(value)}
              key={value}
            >
              <Text variant="headlineLarge" style={styles.text}>
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {["3", "2", "1", "+"].map((value) => (
            <TouchableOpacity
              activeOpacity={0.7}
              mode="contained"
              style={value != "+" ? styles.button : styles.buttonOperator}
              onPress={() => handlePress(value)}
              key={value}
            >
              <Text variant="headlineLarge" style={styles.text}>
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.7}
            mode="contained"
            style={styles.button}
            onPress={() => handlePress("00")}
          >
            <Text variant="headlineLarge" style={styles.text}>
              00
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            mode="contained"
            style={styles.button}
            onPress={() => handlePress("0")}
          >
            <Text variant="headlineLarge" style={styles.text}>
              0
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            mode="contained"
            style={styles.button}
            onPress={() => handlePress(".")}
          >
            <Text variant="headlineLarge" style={styles.text}>
              .
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            mode="contained"
            style={styles.buttonOperator}
            onPress={handleEqual}
          >
            <Text variant="headlineLarge" style={styles.text}>
              =
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 10,
    backgroundColor: "#192027",
  },
  screen: {
    marginBottom: 20,
  },
  input: {
    padding: 10,
    textAlign: "right",
    backgroundColor: "transparent",
    borderWidth: 0,
    color: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    margin: 2,
    borderRadius: 0,
    backgroundColor: "#323a4a",
    aspectRatio: "1/1",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOperator: {
    flex: 1,
    margin: 2,
    borderRadius: 0,
    backgroundColor: "#0564e3",
    aspectRatio: "1/1",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});

export default Calculator;