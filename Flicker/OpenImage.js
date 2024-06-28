import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, BackHandler, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OpenImage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUrl } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
    return true; 
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const addToFavorites = async () => {
    try {
      let favorites = await AsyncStorage.getItem('favorites');
      favorites = favorites ? JSON.parse(favorites) : [];
      favorites.push(imageUrl);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      Alert.alert('Added to Favorites', 'Image added to favorites!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add image to favorites.');
    }
  };

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text>No image URL provided</Text>
      )}
      {!isFavorite && (
        <TouchableOpacity onPress={addToFavorites} style={styles.favoriteButton}>
          <Icon name="heart-outline" size={24} color="#f00" />
          <Text>Add to Favorites</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    gap: 10,
    borderRadius: 30,
    marginTop: 10,
  },
});

export default OpenImage;
