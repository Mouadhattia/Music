import { combineReducers } from "redux";
import { userReducer } from "./user";
import {postReducer} from "./post"

export const rootReducer = combineReducers({ userReducer,postReducer });
