export const saveAccessToken = (accessToken: string) => {
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
