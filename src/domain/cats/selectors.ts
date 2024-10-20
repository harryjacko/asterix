import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootState";

const getImages = (state: RootState) => state.cats.images;
const getFavourites = (state: RootState) => state.cats.favourites;
const getVotes = (state: RootState) => state.cats.votes;

const getUploadRequestStatus = (state: RootState) =>
  state.cats.uploadImageRequestStatus;
const getFetchImagesRequestStatus = (state: RootState) =>
  state.cats.fetchImagesRequestStatus;
const getCreateFavouritesRequestStatus = (state: RootState) =>
  state.cats.createFavouritesRequestStatus;
const getRemoveFavouritesRequestStatus = (state: RootState) =>
  state.cats.removeFavouritesRequestStatus;
const getFetchVotesRequestStatus = (state: RootState) =>
  state.cats.fetchVotesRequestStatus;
const getSubmitVoteRequestStatus = (state: RootState) =>
  state.cats.submitVoteRequestStatus;

export const getImagesWithFavouritesAndVotes = createSelector(
  getImages,
  getFavourites,
  getVotes,
  (images, favourites, votes) => {
    return images.map((image) => ({
      id: image.id,
      url: image.url,
      width: image.width,
      height: image.height,
      favouriteId: favourites[image.id], // undefined if not found
      voteTotal: votes[image.id] || 0, // assume 0 if no votes
    }));
  },
);

export const catsSelectors = {
  getImages,
  getFavourites,
  getVotes,
  getUploadRequestStatus,
  getFetchImagesRequestStatus,
  getCreateFavouritesRequestStatus,
  getRemoveFavouritesRequestStatus,
  getFetchVotesRequestStatus,
  getSubmitVoteRequestStatus,
  getImagesWithFavouritesAndVotes,
};
