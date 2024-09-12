let initialState = { deviceId: "", player: null };

export const playerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_DEVICE":
      return {
        ...state,
        deviceId: payload?.deviceId,
      };

    case "SET_PLAYER":
      return {
        ...state,
        player: payload?.player,
      };
    default:
      return state;
  }
};
