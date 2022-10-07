import { useContext } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import PlayerGridTile from "../components/Player/PlayerGridTile";
import Button from "../components/UI/Button";

import { PLAYERS_DUMMY_DATA } from "../data/data"
import { PickedPlayersContext } from "../store/picked-players-context";

const PlayersScreen = ({navigation}) => {
  const ctx = useContext(PickedPlayersContext);

  const renderPlayerItem = (playerData) => {
    const pressPlayerItem = () => {
      navigation.navigate("PlayerDetails", { player: playerData.item });
    }
    const pickPlayer = (id) => {
      ctx.pickPlayer(id)
    }
    return (
      <PlayerGridTile player={playerData.item} onPress={pressPlayerItem} onPick={pickPlayer} />
    );
  };

  const newGame = () => {
    navigation.navigate("NewGame")
  }

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
  }
})