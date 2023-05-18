import axios from "axios";
import { AUTH_API_KEY } from "./credentials";

const authenticate = async (mode, email, password, _nickname) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${AUTH_API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
    // needed for createUser, not needed for login
    displayName: _nickname,
  });

  const id = response.data.localId;
  const nickname = response.data.displayName;
  const token = response.data.idToken;

  return { id, nickname, token };
};

export const createUser = async (email, password, nickname) => {
  return authenticate("signUp", email, password, nickname);
};

export const login = async (email, password) => {
  return authenticate("signInWithPassword", email, password);
};
