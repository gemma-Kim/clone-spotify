let initialState = { accessToken: "" };

export const authReducer = (state = initialState, action) => {
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
