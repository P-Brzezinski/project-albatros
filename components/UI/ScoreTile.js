import { Text, View, StyleSheet } from "react-native";
import IconButton from "../UI/IconButton";

const ScoreTile = ({ player }) => {
  return (
    <View style={styles.container}>
      <Text>Player score</Text>
      <IconButton name="caret-forward-outline" size={24} color="black" />
    </View>
  );
};

export default ScoreTile;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
  },
});
