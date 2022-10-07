import { useContext } from "react";
import { Text, View } from "react-native"
import Stopwatch from "../components/UI/Stopwatch";
import { PickedPlayersContext } from "../store/picked-players-context";

const NewGame = () => {
  const ctx = useContext(PickedPlayersContext);

  return (
    <View>
      <Stopwatch />
      <Text>Picked players ids: {ctx.pickedPlayersIds}</Text>
    </View>
  );
};

export default NewGame;