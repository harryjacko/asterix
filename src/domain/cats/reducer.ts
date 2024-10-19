import { createReducer } from "@reduxjs/toolkit";
import { CatsState } from "./types";
import { RequestStatus } from "@/shared/libs/apiClient";
import { actions } from "../rootActions";

const initialState: CatsState = {
  images: [],

  uploadImageRequestStatus: RequestStatus.Idle,
};

const reducer = createReducer(initialState, (builder) => {
  //
  // Upload Image
  //
  builder
    .addCase(actions.cats.selectAndUploadCatPhoto.success, (state) => {
      state.uploadImageRequestStatus = RequestStatus.Fulfilled;
    })
    .addCase(actions.cats.selectAndUploadCatPhoto.failed, (state) => {
      state.uploadImageRequestStatus = RequestStatus.Failed;
    })
    .addCase(actions.cats.selectAndUploadCatPhoto.request, (state) => {
      state.uploadImageRequestStatus = RequestStatus.Pending;
    });
});

export default reducer;
