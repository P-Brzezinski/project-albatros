import { createContext, useState } from "react";

export const PickedPlayersContext = createContext({
    pickedPlayersIds: [],
    pickPlayer: ({id}) => {}
});

const PickedPlayersProvider = ({children}) => {
  const [pickedPLayers, setPickedPlayers] = useState([])

    const pickPlayer = (id) => {
      if (pickedPLayers.includes(id)){
        const filteredIds = pickedPLayers.filter((playerId) => playerId !== id)
        setPickedPlayers(filteredIds)
      } else {
        const newIds = pickedPLayers.concat(id)
        setPickedPlayers(newIds);
      }

    };

    const value = {
      pickedPlayersIds: pickedPLayers,
      pickPlayer: pickPlayer
    };

    return (
      <PickedPlayersContext.Provider value={value}>
        {children}
      </PickedPlayersContext.Provider>
    );
}

export default PickedPlayersProvider
