import { createReducer } from "@reduxjs/toolkit";
import { CatsState } from "./types";
import { RequestStatus } from "@/shared/libs/apiClient";
import { actions } from "../rootActions";

const initialState: CatsState = {
  images: [],
  favourites: [],

  uploadImageRequestStatus: RequestStatus.Idle,
  fetchImagesRequestStatus: RequestStatus.Idle,
  fetchFavouritesRequestStatus: RequestStatus.Idle,
  createFavouritesRequestStatus: RequestStatus.Idle,
  removeFavouritesRequestStatus: RequestStatus.Idle,
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
    })

    //
    // Fetch favourites
    //
    .addCase(actions.cats.fetchFavourites.success, (state, { payload }) => {
      state.fetchFavouritesRequestStatus = RequestStatus.Fulfilled;
      state.favourites = payload;
    })
    .addCase(actions.cats.fetchFavourites.failed, (state) => {
      state.fetchFavouritesRequestStatus = RequestStatus.Failed;
    })
    .addCase(actions.cats.fetchFavourites.request, (state) => {
      state.fetchFavouritesRequestStatus = RequestStatus.Pending;
    })

    //
    // Create favourites
    //
    .addCase(actions.cats.createFavourite.success, (state, { payload }) => {
      state.createFavouritesRequestStatus = RequestStatus.Fulfilled;
      state.favourites = state.favourites.map((fav) => {
        if (fav.image.id === payload.imageId) {
          return {
            id: payload.id,
            image: {
              id: payload.imageId,
            },
          };
        }
        return fav;
      });
    })
    .addCase(actions.cats.createFavourite.failed, (state, { payload }) => {
      state.createFavouritesRequestStatus = RequestStatus.Failed;
      // Roll back optimisitc UI update
      state.favourites = state.favourites.filter(
        (fav) => fav.image.id !== payload.imageId,
      );
    })
    .addCase(actions.cats.createFavourite.request, (state, { payload }) => {
      state.createFavouritesRequestStatus = RequestStatus.Pending;
      // Optimistically update UI, we'll roll back if it fails
      state.favourites = [
        ...state.favourites,
        {
          id: 123,
          image: {
            id: payload.imageId,
          },
        },
      ];
    })

    //
    // Remove favourites
    //
    .addCase(actions.cats.removeFavourite.success, (state) => {
      state.removeFavouritesRequestStatus = RequestStatus.Fulfilled;
    })
    .addCase(actions.cats.removeFavourite.failed, (state) => {
      state.removeFavouritesRequestStatus = RequestStatus.Failed;
    })
    .addCase(actions.cats.removeFavourite.request, (state, { payload }) => {
      state.removeFavouritesRequestStatus = RequestStatus.Pending;
      // Optimistically remove favourite
      state.favourites = state.favourites.filter(
        (fav) => fav.image.id !== payload.imageId,
      );
    });
});

export default reducer;
