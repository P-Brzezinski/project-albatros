import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import PlayersQueue from "../components/Player/PlayersQueue";
import Button from "../components/UI/Button";
import Stopwatch from "../components/UI/Stopwatch";
import { GlobalStyles } from "../constants/styles";
import { NewGameContext } from "../store/new-game-context";

const NewGame = ({ navigation }) => {
  const newGameCtx = useContext(NewGameContext);

  const gameEnded = useMemo(() => {
    return newGameCtx.gameEnded;
  }, [newGameCtx]);

  const endGame = () => {
    newGameCtx.endGame();
  };

  // after score counted, go to EndGame screen
  const navigateToEndGameScreen = () => {
    navigation.navigate("EndGame");
  };

  const confirmGameEnd = () => {
    Alert.alert("End Game", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: endGame,
      },
    ]);
  };

  console.log(newGameCtx.timePlayed)

  return (
    <View style={styles.content}>
      {gameEnded && <Text style={styles.gameOverHeader}>Game over!</Text>}
      <Stopwatch />
      <PlayersQueue />
      {!gameEnded && <Button onPress={confirmGameEnd}>End Game</Button>}
    </View>
  );
};

export default NewGame;

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
  },
  gameOverHeader: {
    fontSize: 24,
    fontWeight: "900",
    color: GlobalStyles.colors.primaryBlack,
    marginTop: 16,
  },
});
