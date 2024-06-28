import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

const SideNavigation = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
      >
        <Icon name="home-outline" size={30} style={{ marginLeft: 10 }} />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
      >
        <Icon name="heart-outline" size={30} style={{ marginLeft: 10 }} />
        <Text>Favorite</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
      >
        <Icon name="image-outline" size={30} style={{ marginLeft: 10 }} />
        <Text>Images</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
      >
        <Icon name="search-outline" size={30} style={{ marginLeft: 10 }} />
        <Text>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
      >
        <Icon name="man-outline" size={30} style={{ marginLeft: 10 }} />
        <Text>About</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "center"
  },
});

export default SideNavigation;
