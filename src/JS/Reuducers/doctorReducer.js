import {GET_DOCTORS,GET_DOCTORS_SUCCESS,GET_DOCTORS_FAIL} from "../constants"
const initialeState = {
    doctorsList :[],
    isLoading:false
}

const doctorReducer=(state=initialeState,action)=>{
    switch(action.type){
        case GET_DOCTORS:
            return {...state,isLoading : true}
        case GET_DOCTORS_SUCCESS:
            return {...state,isLoading:false,doctorsList:action.payload}
        case GET_DOCTORS_FAIL:
            return{...state,isLoading:false}
        default:
            return state
    }
}
export default doctorReducer