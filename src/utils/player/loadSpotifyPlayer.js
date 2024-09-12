import { getAccessToken } from "../authorization/getAccessToken";
import { setDeviceId } from "../../store/actions/playerActions";

export const loadSpotifyPlayer = async (dispatch) => {
  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;
  document.body.appendChild(script);

  window.onSpotifyWebPlaybackSDKReady = async () => {
    const player = new window.Spotify.Player({
      name: "Web Playback SDK",
      getOAuthToken: (cb) => {
        cb(getAccessToken());
      },
      volume: 0.5,
    });

    player.addListener("ready", ({ device_id }) => {
      console.log("Device ID:", device_id);
      console.log("player", player);
      dispatch(setDeviceId(device_id));
    });

    player.addListener("player_state_changed", (params) => {
      console.log("Currently Playing", params?.track_window?.current_track);
      console.log("Position in Song", params?.position);
      console.log("Duration of Song", params?.duration);
    });

    player.addListener("autoplay_failed", () => {
      console.log("Autoplay is not allowed by the browser autoplay rules");
    });

    // 401 에러 핸들링
    player.addListener("authentication_error", async ({ message }) => {
      console.error("Authentication error", message);
      player.player.connect();
    });

    player.connect();
  };
};
