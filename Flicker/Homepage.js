import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Homepage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        This App is made Using React Native and Flicker Api
      </Text>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/875/875209.png",
          }}
          style={styles.image}
        />
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/889/889105.png",
          }}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    textAlign: "center"
  },
  imageWrapper: {
    margin: 10,
    width: "40%",
    flexDirection: "row",
    justifyContent: "center"
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    margin: 10,
  },
});

export default Homepage;
