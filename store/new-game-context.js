import { createContext, useState } from "react";

export const NewGameContext = createContext({
  gameEnded: "", //string only as a placeholder
  timePlayed: "",
  endGame: () => {},
  noticeTime: () => {},
  newGame: () => {},
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

  const newGame = () => {
    setGameEnded(false);
    setTimePlayed("");
  };

  const value = {
    gameEnded: gameEnded,
    timePlayed: timePlayed,
    endGame: endGame,
    noticeTime: noticeTime,
    newGame: newGame
  };

  return (
    <NewGameContext.Provider value={value}>{children}</NewGameContext.Provider>
  );
};

export default NewGameContextProvider;
