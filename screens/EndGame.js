import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { getFormattedTime } from "../util/TimeHelper";

const EndGame = ({ route }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.mainHeader}>End Game Screen</Text>
      <Text style={styles.secondaryHeader}>
        Time played: {getFormattedTime(route.params.gameTime)}{" "}
      </Text>
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
    padding: 16,
  },
  secondaryHeader: {
    fontSize: 16,
    color: GlobalStyles.colors.primaryBlack,
    fontWeight: "600"
  },
});
