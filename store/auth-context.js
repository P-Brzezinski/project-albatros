import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  firstPlayer: {
    id: "",
    nickname: "",
    token: "",
  },
  isAuthenticated: false,
  authenticate: (authData) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [firstPlayer, setFirstPlayer] = useState({});

  const authenticate = ({ id, nickname, token }) => {
    setFirstPlayer({
      id,
      nickname,
      token,
    });

    AsyncStorage.setItem("id", id);
    AsyncStorage.setItem("nickname", nickname);
    AsyncStorage.setItem("token", token);
  };

  const logout = () => {
    setFirstPlayer({});

    AsyncStorage.removeItem("id");
    AsyncStorage.removeItem("nickname");
    AsyncStorage.removeItem("token");
  };

  const value = {
    firstPlayer,
    isAuthenticated: !!firstPlayer.token,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
