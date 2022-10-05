import { Pressable, StyleSheet, Text, View, Platform } from "react-native"
import { Colors } from "../../constants/colors";

const PlayerGridTile = ({name, onPress}) => {
    return (
      <View style={styles.gridItem}>
        <Pressable
          android_ripple={{ color: Colors.primaryRipple }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={onPress}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{name}</Text>
          </View>
        </Pressable>
      </View>
    );
}

export default PlayerGridTile

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: Colors.primaryWhite, //to make shadowColor visible on iOS
    shadowColor: Colors.primaryBlack,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryLight
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});