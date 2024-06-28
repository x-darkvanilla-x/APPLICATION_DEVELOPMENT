import React, { useState, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';

const Favorite = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const fetchFavoritesFromLocalStorage = async () => {
    try {
      const favoriteImages = await AsyncStorage.getItem("favorites");
      if (favoriteImages) {
        setImages(JSON.parse(favoriteImages));
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setSnackbarVisible(true);
      setLoading(false);
    }
  };

  const deleteFavorite = async (imageUrl) => {
    try {
      let favoriteImages = await AsyncStorage.getItem("favorites");
      favoriteImages = favoriteImages ? JSON.parse(favoriteImages) : [];
      const updatedFavorites = favoriteImages.filter(url => url !== imageUrl);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setImages(updatedFavorites);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavoritesFromLocalStorage();
    }, [])
  );

  const handleImagePress = (imageUrl) => {
    navigation.navigate("OpenImage", { imageUrl });
  };

  const onRetry = () => {
    setSnackbarVisible(false);
    setLoading(true);
    fetchFavoritesFromLocalStorage();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#22bb33" />
      ) : (
        <ScrollView contentContainerStyle={styles.imageContainer}>
          {images.map((url, index) => (
            <View key={index} style={styles.imageWrapper}>
              <TouchableOpacity onPress={() => handleImagePress(url)}>
                <Image source={{ uri: url }} style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => deleteFavorite(url)}
              >
                <Icon name="trash-bin" size={24} color="#f00" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "RETRY",
          onPress: onRetry,
        }}
      >
        Network error. Please try again.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10,
  },
  imageWrapper: {
    margin: 10,
    width: "40%",
    position: "relative",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    backgroundColor: "#fff",
  },
  deleteButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    padding: 5,
  },
});

export default Favorite;
