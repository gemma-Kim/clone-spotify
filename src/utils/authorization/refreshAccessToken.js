export const refreshAccessToken = () => {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  // const redirect_uri = "http://localhost:3000/auth-redirect";
  const redirect_uri = "https://apptify.netlify.app/auth-redirect";
  const state = "82djfhgdjfhgjdhf"; //generateRandomString(16);
  // localStorage.setItem(stateKey, state);
  const scope =
    "user-read-private user-read-email user-library-modify user-read-playback-state user-modify-playback-state streaming user-library-read user-follow-read";

  localStorage.setItem("previous_url", window.location.href);

  // 리다이렉트
  window.location.href = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(
    client_id
  )}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${redirect_uri}&state=${encodeURIComponent(state)}`;
};
