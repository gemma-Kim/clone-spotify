export const saveAccessToken = (accessToken) => {
  return {
    type: "SAVE",
    payload: { accessToken },
  };
};

export const clearAccessToken = () => {
  return {
    type: "CLEAR",
  };
};
