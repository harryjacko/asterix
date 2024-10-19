import { RequestStatus } from "@/shared/libs/apiClient";
import { ImageURISource } from "react-native";

export interface CatsState {
  images: ImageURISource[];
  uploadImageRequestStatus: RequestStatus;
}
