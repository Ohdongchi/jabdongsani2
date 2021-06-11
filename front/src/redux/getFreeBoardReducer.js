import axios from "axios";
import ActionTypes from "./config/ActionTypes";

// state 
const freeBoard_State = {
    freeBoardData: [],
    freeBoardError:null,
};

export const freeRequest = () => {
    return {
        type:ActionTypes.FREE_BOARD_REQUEST,
    };
};


const getFreeBoardReducer = (state=freeBoard_State, action) => {
    switch(action.type) {
        case ActionTypes.FREE_BOARD_REQUEST:
            return {
                ...state,
            };
        case ActionTypes.FREE_BOARD_SUCCESS:
            return {
                ...state,
                freeBoardData:action.payload
            };
        case ActionTypes.FREE_BOARD_FAILURE:
            console.log("Error :"+action.Error);
            return {
                ...state,
                freeBoardError:action.Error
            }
        default:
            return state;
    }
}

export default getFreeBoardReducer;