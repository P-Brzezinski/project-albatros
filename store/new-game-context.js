import { createContext, useState } from "react";

export const NewGameContext = createContext({
  players: [],
  gameEnded: "", //string only as a placeholder
  gameStartedDate: "", //string only as a placeholder
  timePlayed: "",
  pickPlayer: ({ pickedPlayer }) => {},
  countScore: (playerId, score) => {},
  endGame: () => {},
  noticeTime: () => {},
  newGame: () => {},
});

const NewGameContextProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameStartedDate, setGameStartedDate] = useState("");
  const [timePlayed, setTimePlayed] = useState("");

  const pickPlayer = (pickedPlayer) => {
    const newPlayers = players.concat(pickedPlayer);
    setPlayers(newPlayers);
  };

  const countScore = (playerId, scoreValue) => {
    const updatedPlayers = players.map((player) =>
      player.id === playerId ? { ...player, score: scoreValue } : player
    );
    setPlayers(updatedPlayers);
  };

  const endGame = () => {
    setGameEnded(!gameEnded);
  };

  const noticeTime = (time) => {
    setTimePlayed(time.h + ":" + time.min + ":" + time.sec);
  };

  const newGame = () => {
    // reset score
    setPlayers((prevState) => {
      return prevState.map((player) => {
        return { ...player, score: 0 };
      });
    });
    setGameEnded(false);
    setTimePlayed("");
    setGameStartedDate(new Date(Date.now()));
  };

  const value = {
    players: players,
    gameEnded: gameEnded,
    gameStartedDate: gameStartedDate,
    timePlayed: timePlayed,
    pickPlayer: pickPlayer,
    countScore: countScore,
    endGame: endGame,
    noticeTime: noticeTime,
    newGame: newGame,
  };

  return (
    <NewGameContext.Provider value={value}>{children}</NewGameContext.Provider>
  );
};

export default NewGameContextProvider;
