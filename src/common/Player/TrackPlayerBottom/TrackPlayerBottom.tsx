import React from "react";
import "./TrackPlayerBottom.style.css";
import TrackPlayerProgressBar from "../TrackPlayerProgressBar/TrackPlayerProgressBar";
import { useTrackPlayer } from "../TrackPlayerProvider/TrackPlayerProvider";
import { useDispatch } from "react-redux";
import { getPlayer } from "../../../utils/player/loadSpotifyPlayer";

const TrackPlayerBottom = () => {
  const { track, album, setTrack, setPositionMs, setDurationMs } =
    useTrackPlayer();

  const dispatch = useDispatch();
  const player = getPlayer(dispatch);

  player?.addListener("player_state_changed", (params: any) => {
    const currentTrack = params?.track_window?.current_track;
    if (currentTrack) {
      if (track && track !== currentTrack) {
        const position = params?.position;
        const duration = params?.duration;
        setTrack(currentTrack);
        setPositionMs(position);
        setDurationMs(duration);
      }
    }
  });

  return (
    <div className="track-player-bottom-container">
      <div className="track-player-bottom-info-container">
        {/* 앨범 이미지 */}
        <div
          className="track-player-bottom-album-img"
          style={{
            backgroundImage: `url(${
              track?.album?.images[0].url ?? album?.images[0].url
            })`,
          }}
        ></div>

        {/* 트랙 정보 (트랙 이름과 아티스트) */}
        <div className="track-player-bottom-track-info-container">
          <div className="track-player-bottom-track-name-container">
            {track?.name || " "}
          </div>
          <div className="track-player-bottom-track-artist-container">
            {track?.artists?.map((artist: any) => artist?.name).join(", ") ||
              " "}
          </div>
        </div>
      </div>

      {/* 하단 재생 바 */}
      <TrackPlayerProgressBar
        className="track-player-bottom-controller"
        track={track}
      />
      <div className="track-player-bottom-empty">.</div>
    </div>
  );
};

export default TrackPlayerBottom;
