import { RequestStatus } from "@/shared/libs/apiClient";

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface CatsState {
  images: CatImage[];
  uploadImageRequestStatus: RequestStatus;
  fetchImagesRequestStatus: RequestStatus;
}
