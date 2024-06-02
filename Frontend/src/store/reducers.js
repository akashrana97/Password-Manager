import { combineReducers } from "redux";
import Login from "./Authentication/login/reducer";

const rootReducer = combineReducers({
  Login,
});

export default rootReducer;
