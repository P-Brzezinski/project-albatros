import { FlatList } from "react-native";
import PlayerGridTile from "../components/player/PlayerGridTile";

import { PLAYERS_DUMMY_DATA } from "../data/data"

const PlayersScreen = ({navigation}) => {

  const renderPlayerItem = (playerData) => {
    const pressPlayerItem = () => {
      navigation.navigate("PlayerDetails", { player: playerData.item });
    }
    return <PlayerGridTile name={playerData.item.name} onPress={pressPlayerItem} />;
  };

  return (
    <FlatList
      data={PLAYERS_DUMMY_DATA}
      keyExtractor={(item) => item.id}
      renderItem={renderPlayerItem}
      numColumns={2}
    />
  );
};

export default PlayersScreen;
