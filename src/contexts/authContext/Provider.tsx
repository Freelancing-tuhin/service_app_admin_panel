/* eslint-disable @typescript-eslint/no-explicit-any */
import actions from "./actions";
import reducer from "./reducer";
import { useCallback, useReducer } from "react";
import { ContextProviderProps } from "../context.types";
import AuthContext from "./authContext";

import { Store } from "../../@types/contexts/authContext/store.types";

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("@user");
  return user ? JSON.parse(user) : null;
};

const initialState: Store = {
  isLoggedIn: false,
  user: getUserFromLocalStorage(),
};

const AuthContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = useCallback(
    (user: any | null) => {
      dispatch({ type: actions.SET_USER, payload: { ...state, user } });
      if (user) {
        localStorage.setItem("@user", JSON.stringify(user));
      } else {
        localStorage.removeItem("@user");
      }
    },
    [state]
  );

  const value = {
    user: state.user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
