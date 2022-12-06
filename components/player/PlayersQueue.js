import { Text, View, StyleSheet, FlatList } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { PLAYER_COLORS } from "../../constants/player-colors";
import { List } from "react-native-paper";
import NumericInput from "react-native-numeric-input";

const PlayersQueue = ({ pickedPlayers, gameEnded }) => {
  const players = pickedPlayers.map((player, index) => {
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
    <View style={styles.container}>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            key={item.id}
            title={item.name}
            right={() => {
              return !gameEnded ? null : (
                <NumericInput
                  value={0}
                  onChange={() => {}}
                  totalWidth={128}
                  totalHeight={40}
                  step={1}
                  valueType="real"
                  rounded
                  rightButtonBackgroundColor={GlobalStyles.colors.primaryMedium}
                  leftButtonBackgroundColor={GlobalStyles.colors.primaryLight}
                />
              );
            }}
            left={() => <List.Icon color={item.color} icon="account" />}
          />
        )}
      />
    </View>
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
  container: {
    margin: 24,
  },
});
