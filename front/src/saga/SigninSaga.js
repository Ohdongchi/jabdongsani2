// Signin Saga

import { all, fork, takeEvery, call, put} from "redux-saga/effects";

import axios from "axios";
import ActionTypes from "../redux/config/ActionTypes";

const signinAPI = (data) => { // data = payload 값이 들어옴
    
    return axios.post("http://localhost:8000/auth/signin", data);
    
};

function* signin({ payload }) { // payload 에 로그인 정보를 가져옴
    try {
        // console.log("signin:",payload);
        // call (API요청, 데이터)
        const { data } = yield call(signinAPI, payload);
        yield put({
            type: ActionTypes.SIGNIN_SUCCESS,
            payload: data
        });
    } catch (err) {
        yield put({
            type: ActionTypes.SIGNIN_FAILURE,
            Error:"로그인에 실패 하였습니다."
        })
    }
}

function* watchLogin() {
    yield takeEvery(ActionTypes.SIGNIN_REQUEST, signin); // request 요청이 들어오면 signin 제너레이터 실행
};

export default function* SigninSaga() {
    yield all([
        fork(watchLogin), // 비동기 호출 (watchLogin 제너레이터 비동기 실행)
    ]);
}