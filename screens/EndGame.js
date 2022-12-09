import { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PlayersScoreBoard from "../components/Player/PlayersScoreBoard";
import { GlobalStyles } from "../constants/styles";
import { getFormattedTime } from "../util/TimeHelper";
import { insertGame } from "../util/database";
import { NewGameContext } from "../store/new-game-context";
import Game from "../models/game";
import { Button } from "react-native-paper";

const EndGame = () => {
  const [gameSaved, setGameSaved] = useState(false);
  const newGameCtx = useContext(NewGameContext);

  const saveGame = async () => {
    const game = new Game(
      newGameCtx.gameStartedDate.toString(),
      new Date(Date.now()).toString(),
      newGameCtx.timePlayed
    );
    await insertGame(game).then(setGameSaved((prevState) => !prevState));
  };

  return (
    <View style={styles.content}>
      <Text style={styles.mainHeader}>End Game Screen</Text>
      <Text style={styles.secondaryHeader}>
        Time played: {newGameCtx.timePlayed}
      </Text>
      {/* <PlayersScoreBoard />  // TODO */}
      <View style={styles.buttonContainer}>
        {!gameSaved ? (
          <Button
            onPress={saveGame}
            icon="content-save"
            mode="contained"
            buttonColor={GlobalStyles.colors.primaryMedium}
          >
            Save Game
          </Button>
        ) : (
          <Text>Game saved in DB</Text>
        )}
      </View>
    </View>
  );
};

export default EndGame;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainHeader: {
    fontSize: 24,
    fontWeight: "900",
    color: GlobalStyles.colors.primaryBlack,
    paddingBottom: 16,
  },
  secondaryHeader: {
    fontSize: 16,
    color: GlobalStyles.colors.primaryBlack,
    fontWeight: "600",
    paddingBottom: 16,
  },
  buttonContainer: {
    marginTop: 32,
  },
});
