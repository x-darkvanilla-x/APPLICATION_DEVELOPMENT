import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const OpenImage = () => {
  const route = useRoute();
  const { imageUrl } = route.params;

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text>No image URL provided</Text>
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
    height: '100%',
    resizeMode: 'contain',
  },
});

export default OpenImage;
