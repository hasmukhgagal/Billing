import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootRuducer from "./reducers";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootRuducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
// compose(
//   applyMiddleware(...middleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
