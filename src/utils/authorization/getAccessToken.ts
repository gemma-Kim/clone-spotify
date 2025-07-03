import { store } from "../../stores/store";
import { refreshAccessToken } from "./refreshAccessToken";

export const getAccessToken = () => {
  const accessToken = store.getState()?.auth?.accessToken;

  if (accessToken) {
    return accessToken;
  } else {
    refreshAccessToken();
  }
};
