import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./authReducer";

const storedUser = localStorage.getItem("user");

const INITIAL_STATE = {

  currentUser:  storedUser ? JSON.parse(storedUser) : null,

};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

// saving information in localstorage 

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.currentUser))
  },[state.currentUser])




  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
