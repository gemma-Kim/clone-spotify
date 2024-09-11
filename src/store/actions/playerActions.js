export const setDeviceId = (deviceId) => {
  return {
    type: "SET_DEVICE",
    payload: { deviceId },
  };
};

export const setPlayer = (player) => {
  return {
    type: "SET_PLAYER",
    payload: { player },
  };
};
