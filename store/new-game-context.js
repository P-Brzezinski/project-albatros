import { createContext, useState } from "react";

export const NewGameContext = createContext({
  gameEnded: "", //string only as a placeholder
  gameStartedDate: "", //string only as a placeholder
  timePlayed: "",
  endGame: () => {},
  noticeTime: () => {},
  newGame: () => {},
});

const NewGameContextProvider = ({ children }) => {
  const [gameEnded, setGameEnded] = useState(false);
  const [gameStartedDate, setGameStartedDate] = useState("");
  const [timePlayed, setTimePlayed] = useState("");

  const endGame = () => {
    setGameEnded(!gameEnded);
  };

  const noticeTime = (time) => {
    setTimePlayed(time.h + ":" + time.min + ":" +time.sec);
  };

  const newGame = () => {
    setGameEnded(false);
    setTimePlayed("");
    setGameStartedDate(new Date(Date.now()));
  };

  const value = {
    gameEnded: gameEnded,
    timePlayed: timePlayed,
    endGame: endGame,
    noticeTime: noticeTime,
    newGame: newGame,
    gameStartedDate: gameStartedDate,
  };

  return (
    <NewGameContext.Provider value={value}>{children}</NewGameContext.Provider>
  );
};

export default NewGameContextProvider;
