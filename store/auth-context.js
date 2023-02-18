import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  id: "",
  nickname: "",
  token: "",
  isAuthenticated: false,
  authenticate: (authData) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [id, setId] = useState();
  const [authNickname, setAuthNickname] = useState();
  const [authToken, setAuthToken] = useState();

  const authenticate = ({ id, nickname, token }) => {
    setId(id);
    setAuthNickname(nickname);
    setAuthToken(token);

    AsyncStorage.setItem("id", id);
    AsyncStorage.setItem("nickname", nickname);
    AsyncStorage.setItem("token", token);
  };

  const logout = () => {
    setId(null);
    setAuthNickname(null);
    setAuthToken(null);

    AsyncStorage.removeItem("id");
    AsyncStorage.removeItem("nickname");
    AsyncStorage.removeItem("token");
  };

  const value = {
    id: id,
    nickname: authNickname,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
