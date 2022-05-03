import { combineReducers } from "redux";
import artReducer from "./artReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
	user: userReducer,
	arts: artReducer
})