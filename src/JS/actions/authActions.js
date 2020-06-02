import axios from "axios";

import { returnErrors, clearErrors } from "./errorActions";

import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  DELETE_USER_SUCCESS,
  DELETE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_PASSWORD_SUCCESS,
} from "../constants";

/*-------------------------------------- REGISTER A NEW USER -----------------------------------*/

export const registerUser = ({ name, email, password }) => async (dispatch) => {
  try {
    const savedUser = await axios.post(
      "http://localhost:5000/users/registre_user",
      { name, email, password }
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: savedUser.data,
      userType: "patient"
    });
    dispatch(clearErrors());
  } catch (err) {
    dispatch(
      returnErrors({
        msg: err.response.data,
        status: err.response.status,
        id: "REGISTER_FAIL",
      })
    );
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

/*-------------------------------------- LOGIN VALIDATION -----------------------------------*/


export const login = ({ email, password }) => async (dispatch) => {
  try {
    const loginUser = await axios.post("http://localhost:5000/users/login", {
      email,
      password,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: loginUser.data,
      userType:"patient"
    });
    dispatch(clearErrors());
  } catch (err) {
    dispatch(
      returnErrors({
        msg: err.response.data,
        status: err.response.status,
        id: "LOGIN_FAIL",
      })
    );
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

/*--------------------------------------- LOGOUT A USER ----------------------------------------------*/


export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

/*------------------------------------------------- DELETE A USER ------------------------------------*/



export const deleteUser = (payload) => async (dispatch) => {
  dispatch({
    type: DELETE_USER,
  });
  try {
    await axios.delete(`http://localhost:5000/users/delete_user/${payload}`);
    dispatch({
      type: DELETE_USER_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: DELETE_USER
    })
  }
};


/*------------------------------------------ UPDATE A USER INFORMATION------------------------------------*/


export const updateUser = ({updatedUser,id})=>async dispatch=>{
  dispatch({
    type:UPDATE_USER
  })
  try{
    const user = await axios.patch(`http://localhost:5000/users/update_user/${id}`,updatedUser)
    dispatch({
      type:UPDATE_USER_SUCCESS,
      payload:user.data
    })
    dispatch(clearErrors());
  }catch(err){
    dispatch(
      returnErrors({
        msg: err.response.data,
        status: err.response.status,
        id: "UPDATE_FAIL",
      })
    );
    dispatch({
      type:UPDATE_USER
    })
  }
}


/*------------------------------------------- UPDATE A PASSWORD------------------------------------*/


export const updatePassword = ({updatePassword,id})=>async dispatch=>{
  try{
    await axios.patch(`http://localhost:5000/users/update_password/${id}`,updatePassword)
    dispatch({
      type:UPDATE_PASSWORD_SUCCESS
    })
    dispatch(clearErrors());
  }catch(err){
    dispatch(
      returnErrors({
        msg: err.response.data,
        status: err.response.status,
        id: "UPDATE_PASSWORD_FAIL",
      })
    );
  }
}








// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["auth-token"] = token;
  }

  return config;
};
