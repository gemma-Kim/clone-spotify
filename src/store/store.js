import { createStore, combineReducers } from "redux";
import { authReducer } from "./reducers/authReduer";
import { playerReducer } from "./reducers/playerReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  player: playerReducer,
});

export let store = createStore(rootReducer);
