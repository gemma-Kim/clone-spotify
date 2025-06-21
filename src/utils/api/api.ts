import axios from "axios";
import { getAccessToken } from "../authorization/getAccessToken";
import { refreshAccessToken } from "../authorization/refreshAccessToken";

export const api = () => {
  const accessToken = getAccessToken();

  const instance = axios.create({
    baseURL: `https://api.spotify.com/`,
    timeout: 3000,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // 응답 인터셉터 추가
  instance.interceptors.response.use(
    (response) => response,
    (e) => {
      const status = e?.response?.status;

      if (status === 401) {
        // 토큰 만료 등 401일 때 redirect로 토큰 재발급
        refreshAccessToken();
      }

      return Promise.reject(e);
    }
  );

  return instance;
};
