import { useContext } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { List } from "react-native-paper";
import NumericInput from "react-native-numeric-input";
import { PLAYER_COLORS } from "../../constants/player-colors";
import { GlobalStyles } from "../../constants/styles";
import { NewGameContext } from "../../store/new-game-context";

const PlayersQueue = ({ gameEnded, summarize }) => {
  const newGameCtx = useContext(NewGameContext);

  const PLAYERS = newGameCtx.players.map((player, index) => {
    return { ...player, color: PLAYER_COLORS[index] };
  });

  if (!PLAYERS || PLAYERS.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No players added yet - start adding some
        </Text>
      </View>
    );
  }

  const showScore = (score) => {
    if (summarize) {
      return <Text>{score}</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={PLAYERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            key={item.id}
            title={item.name}
            right={() => {
              if (gameEnded && summarize) {
                return showScore(item.score);
              } else if (gameEnded && !summarize) {
                return (
                  <NumericInput
                    value={item.score}
                    onChange={(value) => {
                      newGameCtx.countScore(item.id, value);
                    }}
                    totalWidth={128}
                    totalHeight={40}
                    step={1}
                    valueType="real"
                    rounded
                    rightButtonBackgroundColor={
                      GlobalStyles.colors.primaryMedium
                    }
                    leftButtonBackgroundColor={GlobalStyles.colors.primaryLight}
                  />
                );
              } else {
                return showScore(item.score);
              }
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
