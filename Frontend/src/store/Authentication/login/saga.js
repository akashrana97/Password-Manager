import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Login Redux States
import {
  LOGIN_USER,
  LOGOUT_USER,
  SOCIAL_LOGIN,
  REQUEST_LOG_USER,
} from "./actionTypes";
import {
  apiError,
  loginSuccess,
  logoutUserSuccess,
  getLogUserSuccess,
  getLogUserFail,
} from "./actions";

//Include Both Helper File with needed methods
import { authFetch, liveLogin, postLogin } from "../../../helpers/api_helper";
import Cookies from "js-cookie";
import Axios from "../../../helpers/Axios";
import { env_api } from "../../../config";

export function* getLogUser() {
  try {
    const response = yield call(
      Axios.get,env_api.API_URL+"login/")
    yield put(getLogUserSuccess(response.data));
  } catch (error) {
    yield put(getLogUserFail(error));
  }
}

export function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(
      Axios.post,
      env_api.API_URL+"login/",
      JSON.stringify({ username: user.username, password: user.password,recaptchaValue:user.token  }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.access && response.data.refresh) {
      yield put(loginSuccess(response.data));
      sessionStorage.setItem("authUser", JSON.stringify(response.data));
      Cookies.set("authUser", JSON.stringify(response.data), { expires: 30 });
      toast.success(`Welcome back ! ${response.data.username}`, {
        autoClose: 3000,
      });
      // history("/dashboard");
      history("/");
    } else {
      yield put(apiError("Invalid credentials"));
      toast.error("Invalid credentials", { autoClose: 3000 });
      history("/login");
    }
  } catch (error) {
    yield put(apiError(error));
    // toast.error(error.message || "An error occurred", { autoClose: 3000 });

    if (error?.response?.data?.Error) {
      toast.error(error.response.data.Error || "An error occurred", {
        autoClose: 3000,
      });
    } else {
      toast.error(error.message || "An error occurred", { autoClose: 3000 });
    }

    history("/login");
  }
}

function* logoutUser() {
  try {
    sessionStorage.removeItem("authUser");
    Cookies.remove("authUser");
    localStorage.removeItem("OrgTree");
    yield put(logoutUserSuccess(LOGOUT_USER, true));
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}


function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(REQUEST_LOG_USER, getLogUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
