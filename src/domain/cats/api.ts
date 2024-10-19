import { ImageURISource } from "react-native";
import uuid from "react-native-uuid";

import baseAPIClient from "../../shared/libs/apiClient";

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
  fetchImages: () => baseAPIClient.get<ImageURISource[]>("/images"),
};

export default catsAPIService;
