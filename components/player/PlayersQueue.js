import { useContext } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { PLAYERS_DUMMY_DATA } from "../../data/data";
import { PLAYER_COLORS } from "../../constants/player-colors";
import { PickedPlayersContext } from "../../store/picked-players-context";
import PlayerItem from "./PlayerItem";
import ScoreTile from "../UI/ScoreTile";

const PlayersQueue = () => {
  const ctx = useContext(PickedPlayersContext);
  const players = ctx.pickedPlayers.map((player, index) => {
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
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.playersQueue}>
              <PlayerItem playerNumber={index} playerData={item} />
              <ScoreTile player={item} />
          </View>
        )}
      />
  );
};

export default PlayersQueue;

const styles = StyleSheet.create({
  fallbackContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: GlobalStyles.colors.primaryMedium,
  },
  playersQueue: {
    flexDirection: "row",
  }
});
