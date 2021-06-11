import {all, fork, takeLatest, call, put} from "redux-saga/effects";

import signin from "./SigninSaga";
import free_board from "./FreeBoardSaga";

export default function* rootSaga() {
    yield all([
        fork(signin),
        fork(free_board)
    ]);
}