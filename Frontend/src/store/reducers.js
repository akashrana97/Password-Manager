import { combineReducers } from "redux";
import Login from "./Authentication/login/reducer";
import { PasswordList } from "./PasswordList/passwordListReducer";

const rootReducer = combineReducers({
  Login,
  PasswordList: PasswordList.reducer,
});

export default rootReducer;
