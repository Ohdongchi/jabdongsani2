import { all, fork, takeEvery, call, put, take} from "redux-saga/effects";
import axios from "axios";
import ActionTypes from "../redux/config/ActionTypes";

const getDataAPI = () => {
    
    return axios.get("http://localhost:8000/api/freeBoard");
};

function* freeBoard() {
    try {
    
        const {data} = yield call(getDataAPI,);
        // console.log("hi!")
        yield put({
            type:ActionTypes.FREE_BOARD_SUCCESS,
            payload:data
        });
    }catch (err) {
        console.error(err);
        yield put({
            type:ActionTypes.FREE_BOARD_FAILURE,
            Error:"자유게시판 데이터를 가져오지 못했습니다."
        });
    }
}

function* watchFreeBoard() {
    
    yield takeEvery(ActionTypes.FREE_BOARD_REQUEST, freeBoard);
}

export default function* FreeBoardSaga() {
    
    yield all([
        fork(watchFreeBoard),
    ]);
}