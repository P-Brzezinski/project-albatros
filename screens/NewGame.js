import { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import PlayersQueue from "../components/Player/PlayersQueue";
import Button from "../components/UI/Button";
import Stopwatch from "../components/UI/Stopwatch";

const NewGame = ({ navigation }) => {
  const getGameTime = useRef();

  const endGame = () => {
    const timePlayed = getGameTime.current.getTime()
    navigateToEndGameScreen(timePlayed);
  };

  const navigateToEndGameScreen = (timePlayed) => {
    navigation.navigate("EndGame", { gameTime: timePlayed });
  };

  return (
    <View>
      <Stopwatch ref={getGameTime}/>
      <PlayersQueue />
      <View style={styles.endGameButtonContainer}>
        <Button onPress={endGame}>End Game</Button>
      </View>
    </View>
  );
};

export default NewGame;

const styles = StyleSheet.create({
  endGameButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
