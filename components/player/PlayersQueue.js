import { useContext } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { PLAYERS_DUMMY_DATA } from "../../data/data";
import { PLAYER_COLORS } from "../../constants/player-colors";
import { PickedPlayersContext } from "../../store/picked-players-context";
import PlayerItem from "./PlayerItem";

const PlayersQueue = () => {
  const ctx = useContext(PickedPlayersContext);
  const players = PLAYERS_DUMMY_DATA.filter((player) =>
    ctx.pickedPlayersIds.includes(player.id)
  ).map((player, index) => {
    return { ...player, color: PLAYER_COLORS[index] };
  });

  if (!players || players.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No players added yet - start adding some
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={players}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <PlayerItem
          playerNumber={index}
          playerName={item.name}
          playerColor={item.color}
        />
      )}
    />
  );
};

export default PlayersQueue;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: GlobalStyles.colors.primaryMedium,
  },
});
