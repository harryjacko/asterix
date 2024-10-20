import { ImageURISource } from "react-native";
import uuid from "react-native-uuid";

import baseAPIClient from "../../shared/libs/apiClient";
import { FavouriteImage } from "./types";

interface SubmitVotePayload {
  image_id: string;
  value: number;
}

interface CreateFavouritePayload {
  image_id: string;
}
export interface CreateFavouriteResponse {
  id: number;
}

const catsAPIService = {
  uploadPhoto: (imageUri: string) => {
    const formData = new FormData();

    // @ts-expect-error FIXME: look at this again
    formData.append("file", {
      name: uuid.v4(),
      uri: imageUri,
      type: "image/jpg",
    });

    return baseAPIClient.post<void>("/images/upload", formData);
  },
  fetchImages: () => baseAPIClient.get<ImageURISource[]>("/images?limit=50"), // Review limit
  submitVote: (payload: SubmitVotePayload) =>
    baseAPIClient.post<void>("/votes", payload),
  createFavourite: (payload: CreateFavouritePayload) =>
    baseAPIClient.post<CreateFavouriteResponse>("/favourites", payload),
  removeFavourite: (favouriteId: number) =>
    baseAPIClient.delete<void>(`/favourites/${favouriteId}`),
  fetchFavourites: () => baseAPIClient.get<FavouriteImage[]>("favourites"),
};

export default catsAPIService;
