import { Text, View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const PlayerDetails = ({route}) => {
  return (
    <View>
      <Text>{route.params.player.name}</Text>
    </View>
  );
};

export default PlayerDetails;

const styles = StyleSheet.create({

})
