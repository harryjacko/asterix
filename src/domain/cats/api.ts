import { ImageURISource } from "react-native";
import baseAPIClient from "../../shared/libs/apiClient";

type PhotoPayload = ImageURISource;

const catsAPIService = {
  uploadPhoto: (payload: PhotoPayload) =>
    baseAPIClient.post<void>("/images/upload", payload),
};

export default catsAPIService;
