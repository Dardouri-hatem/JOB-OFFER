import { combineReducers } from 'redux';
import error from './errorReducer';
import auth from './authReducer';
import doctor from './doctorReducer'
import app from './appointmentsReducer'
export default combineReducers({
    auth,
    error,
    doctor,
    app,
})
