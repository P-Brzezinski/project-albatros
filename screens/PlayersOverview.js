import { useContext } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import PlayerGridTile from "../components/Player/PlayerGridTile";
import { GlobalStyles } from "../constants/styles";
import { AuthContext } from "../store/auth-context";
import { NewGameContext } from "../store/new-game-context";
import Player from "../models/player";

const PlayersScreen = ({ navigation }) => {
  const newGameCtx = useContext(NewGameContext);
  const authCtx = useContext(AuthContext);

  const renderPlayerItem = (playerData) => {
    const pressPlayerItem = () => {
      navigation.navigate("PlayerDetails", { player: playerData.item });
    };
    const pickPlayer = (player) => {
      newGameCtx.pickPlayer(player);
    };
    return (
      <PlayerGridTile
        player={playerData.item}
        onPress={pressPlayerItem}
        onPick={pickPlayer}
      />
    );
  };

  const newGame = () => {
    newGameCtx.newGame();
    navigation.navigate("NewGame");
  };

  return (
    <>
      <FlatList
        data={[new Player(authCtx.id, authCtx.nickname)]}
        keyExtractor={(item) => item.id}
        renderItem={renderPlayerItem}
        numColumns={2}
      />
      <View style={styles.newGameButtonContainer}>
        <Button
          icon="sword-cross"
          mode="contained"
          buttonColor={GlobalStyles.colors.primaryMedium}
          onPress={newGame}
        >
          New Game
        </Button>
      </View>
    </>
  );
};

export default PlayersScreen;

const styles = StyleSheet.create({
  newGameButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
