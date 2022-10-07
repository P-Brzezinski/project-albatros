import { useContext } from "react";
import { Text, View } from "react-native"
import { PickedPlayersContext } from "../store/picked-players-context";

const NewGame = () => {
  const ctx = useContext(PickedPlayersContext);

  return (
    <View>
      <Text>New Game Screen</Text>
      <Text>Picked players ids: {ctx.pickedPlayersIds}</Text>
    </View>
  );
};

export default NewGame;