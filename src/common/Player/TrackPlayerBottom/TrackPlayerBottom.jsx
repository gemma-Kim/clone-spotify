import React from "react";
import "./TrackPlayerBottom.style.css";
import TrackPlayerProgressBar from "../TrackPlayerProgressBar/TrackPlayerProgressBar";
import { useTrackPlayer } from "../TrackPlayerProvider/TrackPlayerProvider";

const TrackPlayerBottom = () => {
  const { track } = useTrackPlayer();

  return (
    <div className="track-player-bottom-container">
      <div className="track-player-bottom-info-container">
        {/* 앨범 이미지 */}
        <div
          className="track-player-bottom-album-img"
          style={{
            backgroundImage: `url(${track?.album?.images[0].url})`,
          }}
        ></div>

        {/* 트랙 정보 (트랙 이름과 아티스트) */}
        <div className="track-player-bottom-track-info-container">
          <div className="track-player-bottom-track-name-container">
            {track?.name || " "}
          </div>
          <div className="track-player-bottom-track-artist-container">
            {track?.artists?.map((artist) => artist?.name).join(", ") || " "}
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
