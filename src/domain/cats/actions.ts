import { createAction } from "@reduxjs/toolkit";
import {
  CatImage,
  Failed,
  FavouriteImage,
  RemoveFavouriteAction,
  Vote,
  Votes,
} from "./types";

export const catsActions = {
  selectAndUploadCatPhoto: {
    base: createAction<void>("cats/selectAndUploadCatPhoto/base"),
    request: createAction<void>("cats/selectAndUploadCatPhoto/request"),
    success: createAction<void>("cats/selectAndUploadCatPhoto/success"),
    failed: createAction<Failed>("cats/selectAndUploadCatPhoto/failed"),
  },

  fetchImages: {
    base: createAction<void>("cats/fetchImages/base"),
    request: createAction<void>("cats/fetchImages/request"),
    success: createAction<CatImage[]>("cats/fetchImages/success"),
    failed: createAction<Failed>("cats/fetchImages/failed"),
  },

  submitVote: {
    base: createAction<Vote>("cats/submitVote/base"),
    request: createAction<void>("cats/submitVote/request"),
    success: createAction<void>("cats/submitVote/success"),
    failed: createAction<Failed>("cats/submitVote/failed"),
  },

  createFavourite: {
    base: createAction<string>("cats/createFavourite/base"),
    request: createAction<{ imageId: string }>("cats/createFavourite/request"),
    success: createAction<{ id: number; imageId: string }>(
      "cats/createFavourite/success",
    ),
    failed: createAction<{ error?: Failed; imageId: string }>(
      "cats/createFavourite/failed",
    ),
  },
  removeFavourite: {
    base: createAction<RemoveFavouriteAction>("cats/removeFavourite/base"),
    request: createAction<{ imageId: string }>("cats/removeFavourite/request"),
    success: createAction<{ imageId: string }>("cats/removeFavourite/success"),
    failed: createAction<{ error?: Failed; imageId: string }>(
      "cats/removeFavourite/failed",
    ),
  },
  fetchFavourites: {
    base: createAction<void>("cats/fetchFavourites/base"),
    request: createAction<void>("cats/fetchFavourites/request"),
    success: createAction<FavouriteImage[]>("cats/fetchFavourites/success"),
    failed: createAction<Failed>("cats/fetchFavourites/failed"),
  },

  fetchVotes: {
    base: createAction<void>("cats/fetchVotes/base"),
    request: createAction<void>("cats/fetchVotes/request"),
    success: createAction<Votes[]>("cats/fetchVotes/success"),
    failed: createAction<Failed>("cats/fetchVotes/failed"),
  },
};
