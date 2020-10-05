import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import commonReducer from "./commonReducer";
import customerReducer from "./customerReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  common: commonReducer,
  customer: customerReducer,
  bills: customerReducer,
});
