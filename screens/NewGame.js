import { useContext, useMemo, useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import { Button } from "react-native-paper";
import PlayersQueue from "../components/Player/PlayersQueue";
import Stopwatch from "../components/UI/Stopwatch";
import { GlobalStyles } from "../constants/styles";
import { NewGameContext } from "../store/new-game-context";
import Game from "../models/game";
import { saveGame, saveScores } from "../util/database";

const NewGame = () => {
  const [gameSummarized, setGameSummarized] = useState(false);
  const [gameSaved, setGameSaved] = useState(false);
  const newGameCtx = useContext(NewGameContext);

  const gameEnded = useMemo(() => {
    return newGameCtx.gameEnded;
  }, [newGameCtx]);

  const confirm = (msg1, msg2, onPress) => {
    Alert.alert(msg1, msg2, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: onPress,
      },
    ]);
  };

  const endGame = () => {
    confirm("End Game", "Are you sure?", newGameCtx.endGame);
  };

  const save = async () => {
    const game = new Game(
      newGameCtx.players,
      newGameCtx.gameStartedDate.toString(),
      new Date(Date.now()).toString(),
      newGameCtx.timePlayed
    );
    const savedGame = await saveGame(game);
    await saveScores(savedGame.insertId, newGameCtx.players).then(
      setGameSaved((prevState) => !prevState)
    );
  };

  return (
    <>
      <View style={styles.gameOverHeaderContainer}>
        {gameEnded && <Text style={styles.gameOverHeader}>Game over!</Text>}
      </View>
      <Stopwatch stopTimer={gameEnded} />
      <PlayersQueue gameEnded={gameEnded} summarize={gameSummarized} />
      <View style={styles.endGameButtonContainer}>
        {!gameEnded ? (
          <Button
            onPress={endGame}
            icon="stop-circle-outline"
            mode="contained"
            buttonColor={GlobalStyles.colors.primaryMedium}
          >
            End Game
          </Button>
        ) : (
          <>
            {!gameSummarized ? (
              <Button
                onPress={() => setGameSummarized((prevState) => !prevState)}
                mode="contained"
                buttonColor={GlobalStyles.colors.primaryMedium}
              >
                Summarize
              </Button>
            ) : (
              <Button
                onPress={save}
                disabled={gameSaved}
                icon="content-save"
                mode="contained"
                buttonColor={GlobalStyles.colors.primaryMedium}
              >
                {!gameSaved ? "Save Game" : "Saved in DB"}
              </Button>
            )}
          </>
        )}
      </View>
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
