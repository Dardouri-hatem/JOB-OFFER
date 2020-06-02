import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
} from "../constants";

const initialState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
  isLoading: false,
  userType:localStorage.getItem("userType"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userType", action.userType);
      localStorage.setItem("user",  JSON.stringify(action.payload.user) );
      return {
        ...state,
        token:action.payload.token,
        user: action.payload.user,
        isLoading: false,
        userType:action.userType,
      };
    case UPDATE_PASSWORD_SUCCESS:  
    case DELETE_USER_SUCCESS:        
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        userType:null,
      };
      case UPDATE_USER:  
    case DELETE_USER:
      return{...state,isLoading : true}

    case UPDATE_USER_SUCCESS:
      localStorage.setItem("user",  JSON.stringify(action.payload) );
      return{...state,user:action.payload,isLoading:false}  
    
    default:
      return state;
  }
};
export default authReducer;
