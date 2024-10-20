import { actions } from "@/domain/rootActions";
import { all, takeLatest } from "redux-saga/effects";
import selectAndUploadCatPhoto from "./selectAndUploadCatPhoto";
import fetchImages from "./fetchImages";
import { fetchVotes, submitVote } from "./votes";
import {
  createFavourite,
  fetchFavourites,
  removeFavourite,
} from "./favourites";

export default function* catsSagas() {
  yield all([
    takeLatest(
      [actions.cats.selectAndUploadCatPhoto.base.type],
      selectAndUploadCatPhoto,
    ),

    takeLatest([actions.cats.fetchImages.base.type], fetchImages),
    takeLatest(
      [actions.cats.selectAndUploadCatPhoto.success.type],
      fetchImages,
    ),

    takeLatest([actions.cats.submitVote.base.type], submitVote),
    takeLatest([actions.cats.fetchVotes.base.type], fetchVotes),
    takeLatest([actions.cats.submitVote.success.type], fetchVotes),

    takeLatest([actions.cats.fetchFavourites.base.type], fetchFavourites),
    takeLatest([actions.cats.createFavourite.base.type], createFavourite),
    takeLatest([actions.cats.removeFavourite.base.type], removeFavourite),
    // If removing favourite fails lets recover by calling fetch favourites
    takeLatest([actions.cats.removeFavourite.failed.type], fetchFavourites),
  ]);
}
