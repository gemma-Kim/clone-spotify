const generateRandomString = (length: number) => {
  let randomString = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    randomString += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );
  }
  return randomString;
};

export const refreshAccessToken = () => {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const redirect_uri = "http://localhost:3000/auth-redirect";
  const state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email user-library-modify user-read-playback-state user-modify-playback-state streaming user-library-read user-follow-read user-follow-modify";

  localStorage.setItem("previous_url", window.location.href);

  window.location.href = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(
    client_id as string
  )}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${redirect_uri}&state=${encodeURIComponent(state)}`;
};
