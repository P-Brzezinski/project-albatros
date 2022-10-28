import { Pressable, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles";

const PlayerItem = ({playerNumber, playerName, playerColor}) => {
    return (
      <Pressable
        android_ripple={{ color: GlobalStyles.colors.primaryRipple }}
        style={({ pressed }) => [pressed && styles.buttonPressed, styles.list]}
      >
        <View style={[styles.row, styles.rowNumberSection]}>
          <Text style={styles.number}>{playerNumber + 1}</Text>
        </View>
        <View style={[styles.row, styles.rowColorSection, {backgroundColor: playerColor}]}>
        </View>
        <View style={styles.rowPlayerSection}>
          <Text style={styles.playerDetails}>{playerName}</Text>
        </View>
      </Pressable>
    );
}

export default PlayerItem;

const styles = StyleSheet.create({
  buttonPressed: {
    opacity: 0.5,
  },
  list: {
    flexDirection: "row",
    justifyContent: "center",
    borderTopWidth: "2",
    borderBottomWidth: "2",
    borderColor: GlobalStyles.colors.primaryMedium,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    alignItems: "center",
    justifyContent: "center",
  },
  rowNumberSection: {
    width: "10%",
  },
  rowColorSection: {
    width: "20%",
    borderWidth: 1,
    marginRight: 10,
  },
  rowPlayerSection: {
    width: "70%",
  },
  number: {},
  color: {
    backgroundColor: "green",
    height: 32,
    width: 32,
  },
  playerDetails: {},
});