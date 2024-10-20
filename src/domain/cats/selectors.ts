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

const getImagesWithFavourites = createSelector(
  getImages,
  getFavourites,
  (images, favourites) => {
    return images.map((image) => {
      // TODO: More efficient? e.g. convert to map
      const favourite = favourites.find((fav) => fav.image.id === image.id);

      return {
        id: image.id,
        url: image.url,
        width: image.width,
        height: image.height,
        favouriteId: favourite ? favourite.id : undefined,
      };
    });
  },
);

export const getImagesWithFavouritesAndVotes = createSelector(
  getImages,
  getFavourites,
  getVotes,
  (images, favourites, votes) => {
    // TODO: move these tranforms to the saga?.
    const favouritesMap = new Map(
      favourites.map((fav) => [fav.image.id, fav.id]),
    );
    const votesMap = votes.reduce(
      (acc, vote) => {
        acc[vote.image.id] = (acc[vote.image.id] || 0) + vote.value;
        return acc;
      },
      {} as Record<string, number>,
    );

    return images.map((image) => ({
      id: image.id,
      url: image.url,
      width: image.width,
      height: image.height,
      favouriteId: favouritesMap.get(image.id), // undefined if not found
      voteTotal: votesMap[image.id] || 0, // assume 0 if no votes
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
  getImagesWithFavourites,
  getImagesWithFavouritesAndVotes,
};
