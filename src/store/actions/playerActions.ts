export const setDeviceId = (deviceId: string) => {
  return {
    type: "SET_DEVICE",
    payload: { deviceId },
  };
};

export const setPlayer = (player: any) => {
  return {
    type: "SET_PLAYER",
    payload: { player },
  };
};
