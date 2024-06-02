import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  RESET_LOGIN_FLAG,
  REQUEST_LOG_USER,
  SUCCESS_LOG_USER,
  FAILURE_LOG_USER
} from "./actionTypes";

const initialState = {
  data:[],
  errorMsg: "",
  loading: false,
  error: false,
};

const login = (state = initialState, action ) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: false,
      };
      break;
    case LOGOUT_USER:
      state = { ...state, isUserLogout: false };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state, isUserLogout: true };
      break;
    case API_ERROR:
      state = {
        ...state,
        errorMsg: action.payload.data,
        loading: true,
        error: true,
        isUserLogout: false,
      };
      break;
    case RESET_LOGIN_FLAG:
      state = {
        ...state,
        errorMsg: null,
        loading: false,
        error: false,
      };
      break;
      case REQUEST_LOG_USER:
      state = {
        ...state,
        errorMsg: null,
        loading: false,
        error: false,
      };
      break;
      case SUCCESS_LOG_USER:
      state = {
        ...state,
        data:action.payload,
        errorMsg: null,
        loading: false,
        error: false,
      };
      break;
      case FAILURE_LOG_USER:
      state = {
        ...state,
        errorMsg: action.payload.data,
        loading: false,
        error: true,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
