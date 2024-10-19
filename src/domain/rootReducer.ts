import { combineReducers } from "@reduxjs/toolkit";
import catsReducer from "./cats/reducer";

const rootReducer = combineReducers({
  cats: catsReducer,
});

export default rootReducer;
