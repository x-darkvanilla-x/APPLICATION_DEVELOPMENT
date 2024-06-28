import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { IconButton, Snackbar } from "react-native-paper";

const Search = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("dog");
  const [searchMode, setSearchMode] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    fetchImages();
  }, [pages]);

  const fetchImages = async () => {
    try {
      if (!searchMode && pages === 1) {
        const cachedImages = await AsyncStorage.getItem("images");
        if (cachedImages) {
          setImages(JSON.parse(cachedImages));
          setLoading(false);
        }
      }
      const apiUrl = searchMode
        ? `https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=20&page=${pages}&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s&text=${searchQuery}`
        : `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=${pages}&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      const fetchedImages = data.photos.photo.map((photo) => ({
        id: photo.id,
        url: photo.url_s,
      }));
      setImages(fetchedImages);
      if (!searchMode && pages === 1) {
        await AsyncStorage.setItem("images", JSON.stringify(fetchedImages));
      }
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error(error);
      setSnackbarVisible(true);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleImagePress = (imageUrl) => {
    navigation.navigate("OpenImage", { imageUrl });
  };  

  const loadNextPage = () => {
    setLoadingMore(true);
    setPages((prevPage) => prevPage + 1);
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const loadPrevPage = () => {
    if (pages > 1) {
      setLoadingMore(true);
      setPages((prevPage) => prevPage - 1);
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const handleSearch = () => {
    setPages(1);
    setSearchMode(true);
    setLoading(true);
    fetchImages();
  };

  const onRetry = () => {
    setSnackbarVisible(false);
    setLoading(true);
    fetchImages();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#22bb33" />
      ) : (
        <ScrollView ref={scrollViewRef}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search images..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <IconButton
              style={styles.searchButton}
              icon="magnify"
              size={20}
              onPress={handleSearch}
              iconColor="#fff"
            />
          </View>
          {loadingMore ? (
            <ActivityIndicator size="large" color="#22bb33" />
          ) : null}
          <ScrollView contentContainerStyle={styles.imageContainer}>
            {images.map((item) => (
              <View key={item.id} style={styles.imageWrapper}>
                <TouchableOpacity onPress={() => handleImagePress(item.url)}>
                  <Image source={{ uri: item.url }} style={styles.image} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            <IconButton
              style={styles.paginationButton}
              icon="arrow-left"
              size={20}
              onPress={loadPrevPage}
              disabled={pages === 1}
              iconColor="#fff"
            />
            <Text style={styles.pageNumber}>{pages}</Text>
            <IconButton
              style={styles.paginationButton}
              icon="arrow-right"
              size={20}
              onPress={loadNextPage}
              iconColor="#fff"
            />
          </View>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
    justifyContent: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#22bb33",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
  },
  searchButton: {
    backgroundColor: "#22bb33",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  imageWrapper: {
    margin: 10,
    width: "40%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    backgroundColor: "#fff",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: 300,
    marginVertical: 20,
    marginHorizontal: 50,
  },
  paginationButton: {
    backgroundColor: "#22bb33",
    width: 50,
    height: 50,
  },
  pageNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Search;