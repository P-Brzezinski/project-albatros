import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { PickedPlayersContext } from "../../store/picked-players-context";

const PlayersScoreBoard = () => {
  const ctx = useContext(PickedPlayersContext);
  return (
    <View>
      <Text>PlayersScoreBoard</Text>
    </View>
  );
};

export default PlayersScoreBoard;

const styles = StyleSheet.create({
});
