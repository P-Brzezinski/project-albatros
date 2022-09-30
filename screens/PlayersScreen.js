import { FlatList } from "react-native";
import PlayerGridTile from "../components/PlayerGridTile";

import { PLAYERS_DUMMY_DATA } from "../data/data"

const PlayersScreen = () => {
  const renderPlayerItem = (playerData) => {
    return <PlayerGridTile name={playerData.item.name} />;
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
