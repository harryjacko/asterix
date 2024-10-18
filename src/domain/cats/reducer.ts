import { createReducer } from "@reduxjs/toolkit";
import { CatsState } from "./types";

const initialState: CatsState = {
  images: [],
};

const reducer = createReducer(initialState, (_builder) => {});

export default reducer;
