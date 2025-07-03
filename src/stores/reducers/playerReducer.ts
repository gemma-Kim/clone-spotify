import { PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  deviceId: string;
  player: null | Spotify.Player;
}

let initialState: PlayerState = { deviceId: "", player: null };

export const playerReducer = (
  state = initialState,
  action: PayloadAction<PlayerState>
) => {
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
