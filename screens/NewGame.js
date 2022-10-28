import { View } from "react-native"
import PlayersQueue from "../components/Player/PlayersQueue";
import Stopwatch from "../components/UI/Stopwatch";

const NewGame = () => {
  return (
    <View>
      <Stopwatch />
      <PlayersQueue />
    </View>
  );
};

export default NewGame;