import { RequestStatus } from "@/shared/libs/apiClient";

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface CatImageWithFavourites extends CatImage {
  favouriteId: number | undefined;
}

export interface Vote {
  value: "up" | "down";
  imageId: string;
}

export interface FavouriteImage {
  id: number;
  image: {
    id: string;
  };
}

export interface Votes {
  id: number;
  image: {
    id: string;
  };
  value: number; // -1 or 1
}

export interface CatsState {
  images: CatImage[];
  favourites: FavouriteImage[];

  // Request status
  uploadImageRequestStatus: RequestStatus;
  fetchImagesRequestStatus: RequestStatus;
  fetchFavouritesRequestStatus: RequestStatus;
  createFavouritesRequestStatus: RequestStatus;
  removeFavouritesRequestStatus: RequestStatus;
}

export type Failed = undefined | string;
export interface RemoveFavouriteAction {
  imageId: string;
  favouriteId: number;
}
