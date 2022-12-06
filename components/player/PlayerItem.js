import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const PlayerItem = ({ playerNumber, playerData }) => {
  return (
    <Pressable
      android_ripple={{ color: GlobalStyles.colors.primaryRipple }}
      style={({ pressed }) => [pressed && styles.buttonPressed, styles.list]}
    >
      <View style={[styles.row, styles.rowNumberSection]}>
        <Text style={styles.number}>{playerNumber + 1}</Text>
      </View>
      <View
        style={[
          styles.row,
          styles.rowColorSection,
          { backgroundColor: playerData.color },
        ]}
      ></View>
      <View style={styles.rowPlayerSection}>
        <Text style={styles.playerDetails}>{playerData.name}</Text>
      </View>
    </Pressable>
  );
};

export default PlayerItem;

const styles = StyleSheet.create({
  buttonPressed: {
    opacity: 0.5,
  },
  list: {
    flexDirection: "row",
    flex: 3,
    marginBottom: 12,
  },
  rowNumberSection: {
    flex: 1,
  },
  rowColorSection: {
    flex: 1,
  },
  rowPlayerSection: {
    flex: 3,
  },
});
