import { useContext, useMemo } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import { Button } from "react-native-paper";
import PlayersQueue from "../components/Player/PlayersQueue";
import { PickedPlayersContext } from "../store/picked-players-context";
import Stopwatch from "../components/UI/Stopwatch";
import { GlobalStyles } from "../constants/styles";
import { NewGameContext } from "../store/new-game-context";

const NewGame = ({ navigation }) => {
  const pickedPlayersCtx = useContext(PickedPlayersContext);
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

  return (
    <>
      <View style={styles.gameOverHeaderContainer}>
        {gameEnded && <Text style={styles.gameOverHeader}>Game over!</Text>}
      </View>
      <Stopwatch stopTimer={gameEnded} />
      <PlayersQueue pickedPlayers={pickedPlayersCtx.pickedPlayers} gameEnded={gameEnded}/>
      {!gameEnded && (
        <View style={styles.endGameButtonContainer}>
          <Button
            onPress={confirmGameEnd}
            icon="stop-circle-outline"
            mode="contained"
            buttonColor={GlobalStyles.colors.primaryMedium}
          >
            End Game
          </Button>
        </View>
      )}
    </>
  );
};

export default NewGame;

const styles = StyleSheet.create({
  gameOverHeaderContainer: {
    alignItems: "center",
  },
  gameOverHeader: {
    fontSize: 24,
    fontWeight: "900",
    color: GlobalStyles.colors.primaryBlack,
    marginTop: 16,
  },
  endGameButtonContainer: {
    margin: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
