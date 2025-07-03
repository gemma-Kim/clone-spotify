import { PayloadAction } from "@reduxjs/toolkit";

type AuthStateType = { accessToken: string };
let initialState: AuthStateType = { accessToken: "" };

export const authReducer = (
  state = initialState,
  action: PayloadAction<AuthStateType>
) => {
  const { type, payload } = action;
  switch (type) {
    case "SAVE":
      return {
        ...state,
        accessToken: payload?.accessToken,
      };
    case "CLEAR":
      return {
        ...state,
        accessToken: "",
      };
    default:
      return state;
  }
};
