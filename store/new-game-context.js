import { createContext, useState } from "react";

export const NewGameContext = createContext({
  gameEnded: "",
  timePlayed: "",
  endGame: () => {},
  noticeTime: () => {},
});

const NewGameContextProvider = ({ children }) => {
  const [gameEnded, setGameEnded] = useState(false);
  const [timePlayed, setTimePlayed] = useState("");

  const endGame = () => {
    setGameEnded(!gameEnded);
  };

  const noticeTime = (time) => {
    setTimePlayed(time);
  };

  const value = {
    gameEnded: gameEnded,
    timePlayed: timePlayed,
    endGame: endGame,
    noticeTime: noticeTime,
  };

  return (
    <NewGameContext.Provider value={value}>{children}</NewGameContext.Provider>
  );
};

export default NewGameContextProvider;
