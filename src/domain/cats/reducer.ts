import { createReducer } from "@reduxjs/toolkit";
import { CatsState } from "./types";
import { RequestStatus } from "@/shared/libs/apiClient";
import { actions } from "../rootActions";

const initialState: CatsState = {
  images: [],

  uploadImageRequestStatus: RequestStatus.Idle,
  fetchImagesRequestStatus: RequestStatus.Idle,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    //
    // Upload Image
    //
    .addCase(actions.cats.selectAndUploadCatPhoto.success, (state) => {
      state.uploadImageRequestStatus = RequestStatus.Fulfilled;
    })
    .addCase(actions.cats.selectAndUploadCatPhoto.failed, (state) => {
      state.uploadImageRequestStatus = RequestStatus.Failed;
    })
    .addCase(actions.cats.selectAndUploadCatPhoto.request, (state) => {
      state.uploadImageRequestStatus = RequestStatus.Pending;
    })

    //
    // Fetch images
    //
    .addCase(actions.cats.fetchImages.success, (state, { payload }) => {
      state.fetchImagesRequestStatus = RequestStatus.Fulfilled;
      state.images = payload;
    })
    .addCase(actions.cats.fetchImages.failed, (state) => {
      state.fetchImagesRequestStatus = RequestStatus.Failed;
    })
    .addCase(actions.cats.fetchImages.request, (state) => {
      state.fetchImagesRequestStatus = RequestStatus.Pending;
    });
});

export default reducer;
