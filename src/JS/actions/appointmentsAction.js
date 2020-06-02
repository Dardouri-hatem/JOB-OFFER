import {
  GET_APPOINTMENT,
  GET_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAIL,
  CONFIRM_APPOINTMENT,
  CONFIRM_APPOINTMENT_SUCCESS,
  CONFIRM_APPOINTMENT_FAIL,
} from "../constants";
import axios from "axios";

export const getPatientAppointments = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_APPOINTMENT });
    const appointments = await axios.get(
      `http://localhost:5000/appointment/${userId}`
    );
    dispatch({ type: GET_APPOINTMENT_SUCCESS, payload: appointments.data });
  } catch (error) {
    dispatch({ type: GET_APPOINTMENT });
  }
};

export const getDoctorAppointments = (doctorId) => async (dispatch) => {
  try {
    dispatch({ type: GET_APPOINTMENT });
    const appointments = await axios.get(
      `http://localhost:5000/appointment/doctor_appointments/${doctorId}`
    );
    dispatch({ type: GET_APPOINTMENT_SUCCESS, payload: appointments.data });
  } catch (error) {
    dispatch({ type: GET_APPOINTMENT });
  }
};

export const deleteAppointment = (appId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_APPOINTMENT });
    await axios.delete(`http://localhost:5000/appointment/delete_app/${appId}`);
    dispatch({
      type: DELETE_APPOINTMENT_SUCCESS,
      payload: appId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_APPOINTMENT_FAIL,
      payload: appId,
    });
  }
};
export const confirmAppointment = (appId) => async (dispatch) => {
  try {
    dispatch({ type: CONFIRM_APPOINTMENT });
    await axios.patch(`http://localhost:5000/appointment/confirm_app/${appId}`);
    dispatch({
      type: CONFIRM_APPOINTMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: CONFIRM_APPOINTMENT_FAIL });
  }
};
