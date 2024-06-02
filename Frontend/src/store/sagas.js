import { all, fork } from "redux-saga/effects";
import AuthSaga from "../store/Authentication/login/saga";

export default function* rootSaga() {
  yield all([fork(AuthSaga)]);
}
