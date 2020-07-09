import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import commonReducer from "./commonReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  common: commonReducer
});
