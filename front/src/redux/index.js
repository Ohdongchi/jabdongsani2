import {combineReducers} from "redux";
import SigninReducer from "./SigninReducer";
import getFreeBoard from "./getFreeBoardReducer";
const rootReducer = combineReducers({
    SigninReducer,
    getFreeBoard,
});

export default rootReducer;