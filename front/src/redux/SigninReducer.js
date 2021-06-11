import axios from "axios";
import ActionTypes from "./config/ActionTypes";


// state
const signinState = {
    userData:"",
    requestError:null,
};



export const signinRequest = (data) => {
    return {
        type:ActionTypes.SIGNIN_REQUEST,
        payload:data
    };
}; 

export const signinInit = () => {
    return {
        type:ActionTypes.SIGNIN_INIT
    };
};

const SigninReducer = (state = signinState, action) => {
    switch (action.type) {
        case ActionTypes.SIGNIN_REQUEST:
            return {
                ...state,
                userData:"",
            };
        case ActionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                userData:action.payload
            };
        case ActionTypes.SIGNIN_FAILURE:
            return {
                ...state,
                requestError:action.Error,
            };
        case ActionTypes.SIGNIN_INIT:
            return {
                ...state,
                userData:"",
                requestError:"",
            }
        default:
            return state;
    };
};

export default SigninReducer;