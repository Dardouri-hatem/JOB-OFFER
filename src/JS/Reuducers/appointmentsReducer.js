import {
  GET_APPOINTMENT,
  GET_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAIL,
  CONFIRM_APPOINTMENT,
  CONFIRM_APPOINTMENT_SUCCESS,
  CONFIRM_APPOINTMENT_FAIL
} from "../constants";
const initialState = {
  isLoading: false,
  appointments: [],
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPOINTMENT:
      return { ...state, isLoading: !state.isLoading };
    case GET_APPOINTMENT_SUCCESS:
      return { ...state, isLoading: false, appointments: action.payload };
    case CONFIRM_APPOINTMENT:  
    case DELETE_APPOINTMENT:
      return { ...state, isLoading: true };
    case DELETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        appointments: state.appointments.filter(
          (app) => app._id !== action.payload
        ),
      };
    case CONFIRM_APPOINTMENT_FAIL:  
    case DELETE_APPOINTMENT_FAIL:
      return { ...state, isLoading: false };

    case CONFIRM_APPOINTMENT_SUCCESS:
        return{ ...state, isLoading: false };  
    default:
      return state;
  }
};

export default appointmentReducer;
