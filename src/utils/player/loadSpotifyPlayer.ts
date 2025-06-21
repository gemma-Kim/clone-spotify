import { getAccessToken } from "../authorization/getAccessToken";
import { setDeviceId } from "../../store/actions/playerActions";
import { Dispatch } from "redux";

let player: Spotify.Player | undefined;

export const getPlayer = (dispatch: Dispatch): Spotify.Player | undefined => {
  if (player) return player;
  loadSpotifyPlayer(dispatch);
  return player;
};

export const loadSpotifyPlayer = async (dispatch: Dispatch): Promise<void> => {
  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;
  document.body.appendChild(script);

  window.onSpotifyWebPlaybackSDKReady = async () => {
    if (!player) {
      const newPlayer = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: (token: string) => void) => {
          cb(getAccessToken() as string);
        },
        volume: 0.5,
      });

      newPlayer.addListener("ready", ({ device_id }: { device_id: string }) => {
        console.log("Device ID:", device_id);
        console.log("player", newPlayer);
        dispatch(setDeviceId(device_id));
      });

      newPlayer.addListener("autoplay_failed", () => {
        console.log("Autoplay is not allowed by the browser autoplay rules");
      });

      newPlayer.addListener(
        "authentication_error",
        async ({ message }: { message: string }) => {
          console.error("Authentication error", message);
          newPlayer.connect();
        }
      );

      newPlayer.connect();
      player = newPlayer;
    }

    return player;
  };
};
