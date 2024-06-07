import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  Linking,
  Dimensions,
  Image,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import { Text } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import ScannerBox from "../assets/Scanner.png";

export const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [url, setUrl] = useState("");

  const { width } = Dimensions.get("window");
  const imageSize = width * 0.7;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
    },
    image: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: imageSize,
      height: imageSize,
      marginTop: -imageSize / 2,
      marginLeft: -imageSize / 2,
    },
    button: {
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 5,
      position: "absolute",
      bottom: 50,
      borderRadius: 30,
      backgroundColor: "#22bb33",
      alignSelf: "center",
    },
    text: {
      fontSize: 20,
      color: "white",
      textAlign: "center",
    },
  });

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const copyToClipboard = (data) => {
    Clipboard.setStringAsync(data);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setUrl(data);
    setScanned(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {scanned ? (
        <View style={{ alignItems: "center", gap: 20, margin: 20}}>
          <Text variant="titleMedium" style={{ color: "blue", textAlign: "center" }}>
            {url}
          </Text>
          <View flexDirection={"row"} gap={20}>
            <TouchableOpacity
              style={{
                ...styles.button,
                position: "relative",
                bottom: 0,
                backgroundColor: "#FFA500",
              }}
              onPress={() => copyToClipboard(url)}
            >
              <Text style={styles.text}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.button,
                position: "relative",
                bottom: 0,
                backgroundColor: "#800080",
              }}
              onPress={() => Linking.openURL(url)}
            >
              <Text style={styles.text}>Open In Browser</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={StyleSheet.absoluteFillObject}
          />
          <Image
            source={ScannerBox}
            style={[styles.image, { tintColor: "white" }]}
          />
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
        <Text style={styles.text}>Tap to Scan {scanned ? "Again" : ""}</Text>
      </TouchableOpacity>
    </View>
  );
};
