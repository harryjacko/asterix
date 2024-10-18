import { create } from "apisauce";

// TODO: put in .env
const BASE_URL = "https://api.thecatapi.com/v1/";
const API_KEY = "noAnActualAPIKey";

const headers = {
  Accept: "application/json",
  "x-api-key": API_KEY,
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
