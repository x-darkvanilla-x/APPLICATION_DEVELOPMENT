import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, ImageBackground, Alert } from "react-native";
import { Icon, Button, Text, Card } from "react-native-paper";
import * as Clipboard from 'expo-clipboard';

export const QuoteApp = () => {
  const [quote, setQuote] = useState({});
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => setQuote(data))
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to fetch the quote. Please try again.");
      });

    setCopy(false);
  };

  const copyToClipboard = () => {
    Clipboard.setStringAsync(`"${quote.content}" - ${quote.author}`);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000); // Reset copy state after 2 seconds
  }

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/75/60/60/756060f8fa88ae2292ec605db2a87197.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {quote.content ? (
          <Card style={styles.card}>
            <View style={{ flexDirection: "column", gap: 10 }}>
              <Text variant="titleMedium" style={{ textAlign: "center" }}>
                “{quote.content}”
              </Text>
              <Text
                style={{ textAlign: "right", fontStyle: "italic" }}
                variant="titleSmall"
              >
                - {quote.author}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  mode="contained"
                  buttonColor="#007FFF"
                  onPress={fetchQuote}
                >
                  New Quote
                </Button>
                <Button
                  mode="contained"
                  buttonColor="#32CD32"
                  onPress={copyToClipboard}
                >
                  {copy? "Copied" : "Copy"}
                </Button>
              </View>
            </View>
          </Card>
        ) : (
          <>
            
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    width: "100%"
  },
});
