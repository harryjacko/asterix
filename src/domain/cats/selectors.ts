import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootState";

const getImages = (state: RootState) => state.cats.images;
const getFavourites = (state: RootState) => state.cats.favourites;
const getUploadRequestStatus = (state: RootState) =>
  state.cats.uploadImageRequestStatus;
const getFetchImagesRequestStatus = (state: RootState) =>
  state.cats.fetchImagesRequestStatus;
const getCreateFavouritesRequestStatus = (state: RootState) =>
  state.cats.createFavouritesRequestStatus;
const getRemoveFavouritesRequestStatus = (state: RootState) =>
  state.cats.removeFavouritesRequestStatus;

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

export const catsSelectors = {
  getImages,
  getFavourites,
  getUploadRequestStatus,
  getFetchImagesRequestStatus,
  getCreateFavouritesRequestStatus,
  getRemoveFavouritesRequestStatus,
  getImagesWithFavourites,
};
