import { useContext } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import PlayerGridTile from "../components/Player/PlayerGridTile";
import Button from "../components/UI/Button";

import { PLAYERS_DUMMY_DATA } from "../data/data";
import { NewGameContext } from "../store/new-game-context";
import { PickedPlayersContext } from "../store/picked-players-context";

const PlayersScreen = ({ navigation }) => {
  const pickedPlayersCtx = useContext(PickedPlayersContext);
  const newGameCtx = useContext(NewGameContext);

  const renderPlayerItem = (playerData) => {
    const pressPlayerItem = () => {
      navigation.navigate("PlayerDetails", { player: playerData.item });
    };
    const pickPlayer = (player) => {
      pickedPlayersCtx.pickPlayer(player);
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
        data={PLAYERS_DUMMY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderPlayerItem}
        numColumns={2}
      />
      <View style={styles.newGameButtonContainer}>
        <Button onPress={newGame}>New Game</Button>
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
