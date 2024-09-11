import { createStore, combineReducers } from "redux";
import { authReducer } from "./reducers/authReduer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export let store = createStore(rootReducer);
