import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axiosClient from "../../config/axios";
import tokenAuth from "../../config/token";

import {
  REGISTERED,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_OK,
  LOGIN_ERROR,
  LOG_OUT,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticated: null,
    user: null,
    message: null,
    spinner: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const createUser = async (data) => {
    try {
      const response = await axiosClient.post("/api/users", data);

      dispatch({
        type: REGISTERED,
        payload: response.data,
      });

      // get user
      autenticatedUser();
    } catch (error) {
      // console.log(error.response.data.msg);
      const alert = {
        msg: error.response.data.msg,
        cat: "alert",
      };

      dispatch({
        type: REGISTER_ERROR,
        payload: alert,
      });
    }
  };

  // get autenticated user
  const autenticatedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const response = await axiosClient.get("/api/auth");
      // console.log(respuesta);
      dispatch({
        type: GET_USER,
        payload: response.data.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  // login
  const login = async (data) => {
    try {
      const response = await axiosClient.post("/api/auth", data);

      dispatch({
        type: LOGIN_OK,
        payload: response.data,
      });

      // get user
      autenticatedUser();
    } catch (error) {
      const alert = {
        msg: error.response.data.msg,
        cat: "alert",
      };

      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      });
    }
  };

  // logout 
  const logout = () => {
    dispatch({
      type: LOG_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticated: state.autenticated,
        user: state.user,
        message: state.message,
        spinner: state.spinner,
        createUser,
        login,
        autenticatedUser,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
