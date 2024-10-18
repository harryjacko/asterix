import { combineReducers } from "@reduxjs/toolkit";
import catsReducer from "./cats/reducer";

const rootReducer = combineReducers({
  game: catsReducer,
});

export default rootReducer;
