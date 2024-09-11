import axios from "axios";
import { getAccessToken } from "../authorization/getAccessToken";

export const api = () => {
  const accessToken = getAccessToken();

  return axios.create({
    baseURL: `https://api.spotify.com/`,
    timeout: 3000,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
