import {GET_DOCTORS,GET_DOCTORS_SUCCESS,GET_DOCTORS_FAIL,LOGIN_SUCCESS,LOGIN_FAIL} from "../constants"
import axios from 'axios'
import { returnErrors, clearErrors } from "./errorActions";

/*------------------------------------------- GETTING ALL DOCTOR LIST ------------------------------------*/

export const getDoctors = ()=>async dispatch=>{
dispatch({
    type : GET_DOCTORS
})
try {
    const doctors = await  axios.get('http://localhost:5000/entrepreneur')
    dispatch({
        type : GET_DOCTORS_SUCCESS,
        payload : doctors.data
    })

} catch (error) {
    dispatch({
        type : GET_DOCTORS_FAIL
    })
}
}

/*----------------------------------------- LOGiN A ENTREPRENEUR USER ------------------------------------*/

export const loginDoctor = ({ email, password }) => async (dispatch) => {
    try {
      const loginUser = await axios.post("http://localhost:5000/entrepreneur/login_entrepreneur", {
        email,
        password,
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: loginUser.data,
        userType : "doctor"
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