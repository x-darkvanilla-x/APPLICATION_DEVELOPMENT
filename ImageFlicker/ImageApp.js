import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const ImageApp = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(20);

  useEffect(() => {
    fetchImages();
  }, [pages]);

  const fetchImages = async () => {
    try {
      const cachedImages = await AsyncStorage.getItem("images");
      if (cachedImages) {
        setImages(JSON.parse(cachedImages));
        setLoading(false);
      }
      const response = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=${pages}&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`
      );
      const data = await response.json();
      const fetchedImages = data.photos.photo.map((photo) => ({
        id: photo.id,
        url: photo.url_s,
      }));
      setImages(fetchedImages);
      await AsyncStorage.setItem("images", JSON.stringify(fetchedImages));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleImagePress = (imageUrl) => {
    navigation.navigate("OpenImage", { imageUrl });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          <ScrollView contentContainerStyle={styles.imageContainer}>
            {images.map((item) => (
              <View key={item.id} style={styles.imageWrapper}>
                <TouchableOpacity onPress={() => handleImagePress(item.url)}>
                  <Image source={{ uri: item.url }} style={styles.image} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <Button mode="contained" style={styles.loadmore} onPress={() => {setPages(pages + 10)}}>Load More</Button>
        </ScrollView>
      )}
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
    paddingBottom: 20,
    paddingTop: 20,
  },
  imageWrapper: {
    margin: 10,
    width: "40%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  loadmore :  {
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 20,
    backgroundColor: "#22bb33",
  }
});

export default ImageApp;
