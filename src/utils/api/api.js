import axios from "axios";
import { getAccessToken } from "../authorization/getAccessToken";

export const api = () => {
  const accessToken = getAccessToken();
  console.log("accessToken", accessToken)
  return axios.create({
    baseURL: `https://api.spotify.com/`,
    timeout: 3000,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
