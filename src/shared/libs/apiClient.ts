import { create } from "apisauce";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const headers = {
  Accept: "application/json",
  "x-api-key": API_KEY ?? "",
  "Content-Type": "application/json",
};
export enum RequestStatus {
  Idle = "Idle",
  Pending = "Pending",
  Fulfilled = "Fulfilled",
  Failed = "Failed",
}

const baseAPIClient = create({
  baseURL: BASE_URL,
  headers,
});

export default baseAPIClient;
