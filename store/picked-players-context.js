import { createContext, useState } from "react";

export const PickedPlayersContext = createContext({
  pickedPlayers: [],
  pickPlayer: ({ player }) => {},
});

const PickedPlayersProvider = ({ children }) => {
  const [pickedPLayers, setPickedPlayers] = useState([]);

  const pickPlayer = (pickedPLayer) => {
    if (pickedPLayers.includes(pickedPLayer)) {
      const filteredPlayers = pickedPLayers.filter(
        (player) => player !== pickedPLayer
      );
      setPickedPlayers(filteredPlayers);
    } else {
      const newPlayers = pickedPLayers.concat(pickedPLayer);
      setPickedPlayers(newPlayers);
    }
  };

  const value = {
    pickedPlayers: pickedPLayers,
    pickPlayer: pickPlayer,
  };

  return (
    <PickedPlayersContext.Provider value={value}>
      {children}
    </PickedPlayersContext.Provider>
  );
};

export default PickedPlayersProvider;
