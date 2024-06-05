import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { Alert } from "react-native";

export const TicTacToe = () => {
  const [gameState, setGameState] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [display, setDisplay] = useState(false);
  const [winner, setWinner] = useState("");

  const handlePress = (row, col) => {
    if (gameState[row][col] === "") {
      const newGameState = [...gameState];
      newGameState[row][col] = currentPlayer;
      setGameState(newGameState);
      checkWinner();
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (
        gameState[i][0] === gameState[i][1] &&
        gameState[i][1] === gameState[i][2] &&
        gameState[i][0] !== ""
      ) {
        setWinner(`Player ${gameState[i][0]} wins!`);
        setDisplay(false);
        return;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        gameState[0][i] === gameState[1][i] &&
        gameState[1][i] === gameState[2][i] &&
        gameState[0][i] !== ""
      ) {
        setWinner(`Player ${gameState[0][i]} wins!`);
        setDisplay(false);
        return;
      }
    }

    if (
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2] &&
      gameState[0][0] !== ""
    ) {
      setWinner(`Player ${gameState[0][0]} wins!`);
      setDisplay(false);
      return;
    }

    if (
      gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0] &&
      gameState[0][2] !== ""
    ) {
      setWinner(`Player ${gameState[0][2]} wins!`);
      setDisplay(false);
      return;
    }

    if (
      gameState[0][0] &&
      gameState[0][1] &&
      gameState[0][2] &&
      gameState[1][0] &&
      gameState[1][1] &&
      gameState[1][2] &&
      gameState[2][0] &&
      gameState[2][1] &&
      gameState[2][2]
    ) {
      setWinner(`Draw`);
      setDisplay(false);
    }
  };

  const resetGame = () => {
    setDisplay(true);
    setGameState([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setCurrentPlayer("X");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {display ? (
        <>
          <Text
            variant="titleLarge"
            style={{
              color: "black",
              paddingRight: 10,
              paddingLeft: 10,
              padding: 10,
              fontWeight: "bold",
            }}
          >
            {currentPlayer}'s Turn
          </Text>
          {gameState.map((row, rowIndex) => (
            <View key={rowIndex} style={{ flexDirection: "row" }}>
              {row.map((cell, colIndex) => (
                <TouchableOpacity
                  activeOpacity={1}
                  key={colIndex}
                  onPress={() => handlePress(rowIndex, colIndex)}
                  style={styles.buttons}
                >
                  <Text
                    variant="headlineLarge"
                    style={{
                      fontWeight: "bold",
                      color: cell === "X" ? "red" : "green",
                    }}
                  >
                    {cell}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
            <Text
              variant="titleMedium"
              style={{
                color: "white",
                textTransform: "uppercase",
                paddingRight: 10,
                paddingLeft: 10,
              }}
            >
              Reset
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text
            variant="headlineLarge"
            style={{
              color: "black",
              paddingRight: 10,
              paddingLeft: 10,
              padding: 10,
              fontWeight: "bold",
            }}
          >
            {winner}
          </Text>
          <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
            <Text
              variant="titleMedium"
              style={{
                color: "white",
                textTransform: "uppercase",
                paddingRight: 10,
                paddingLeft: 10,
              }}
            >
              Play Again
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    aspectRatio: 1 / 1,
    width: 100,
    margin: 2,
    borderRadius: 0,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});