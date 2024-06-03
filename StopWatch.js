import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { Icon, Button, Text, Card } from "react-native-paper";

export const StopWatch = () => {
  const [time, setTime] = useState(17000);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const getMillis = (time) => {
    const millis = `0${time % 60}`.slice(-2);

    return `${millis}`;
  };

  const getSeconds = (time) => {
    const seconds = `0${Math.floor(time / 60) % 60}`.slice(-2);

    return `${seconds}`;
  };

  const getMinutes = (time) => {
    const minutes = `0${Math.floor(time / (60 * 60)) % 60}`.slice(-2);

    return `${minutes}`;
  };

  const getHours = (time) => {
    const hours = `0${Math.floor(time / (60 * 60 * 60)) % 60}`.slice(-2);

    return `${hours}`;
  };

  return (
    <ImageBackground
      source={{
        uri: "https://w0.peakpx.com/wallpaper/842/70/HD-wallpaper-anime-aesthetic-anime-aesthetic-nature.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Card style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: 20,
              alignItems: "flex-end",
            }}
          >
            <Text style={styles.timeText} variant="displayLarge">
              {getHours(time)}
            </Text>
            <Text style={styles.timeText} variant="displayLarge">
              :
            </Text>
            <Text style={styles.timeText} variant="displayLarge">
              {getMinutes(time)}
            </Text>
            <Text style={styles.timeText} variant="displayLarge">
              :
            </Text>
            <Text style={styles.timeText} variant="displayLarge">
              {getSeconds(time)}
            </Text>
            <Text style={styles.timeText} variant="titleLarge">
              {getMillis(time)}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleStartPause} buttonColor={isRunning? "#333333": "#32CD32"}>
              <Icon source={isRunning ? "pause" : "play"} color="white" size={20} />
            </Button>
            <Button mode="contained" buttonColor="#007FFF" onPress={handleReset}>
              <Icon source="refresh" color="white" size={20} />
            </Button>
          </View>
        </Card>
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
  },
  card: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  timeText: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});

export default StopWatch;
