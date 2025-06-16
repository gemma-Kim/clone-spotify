import React from "react";
import "./PlayerBottom.style.css";
import TrackPlayerProgressBar from "../../../common/Player/TrackPlayerProgressBar/TrackPlayerProgressBar";
import { useTrackPlayer } from "../../../common/Player/TrackPlayerProvider/TrackPlayerProvider";

const PlayerBottom = () => {
  const { track, album } = useTrackPlayer();

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
      <div className="track-player-bottom-controller">
        <TrackPlayerProgressBar track={track!} />
      </div>
      <div className="track-player-bottom-empty">.</div>
    </div>
  );
};

export default PlayerBottom;
