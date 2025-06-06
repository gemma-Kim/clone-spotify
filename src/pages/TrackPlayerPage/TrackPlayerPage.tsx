import React, { useEffect, useState } from "react";
import "./TrackPlayerPage.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faEllipsis,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import TrackPlayerProgressBar from "../../common/Player/TrackPlayerProgressBar/TrackPlayerProgressBar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTrackQuery } from "../../hooks/track/useTrackQuery";

export const TrackPlayerPage = () => {
  const { id: trackId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMs, setPositionMs] = useState(0);
  const {
    data: [track],
  } = useTrackQuery(trackId as string);

  const deviceId = useSelector((state: any) => state.player.deviceId);

  useEffect(() => {
    let interval: any;
    if (track?.duration_ms > positionMs) {
      if (isPlaying && deviceId) {
        interval = setInterval(() => {
          setPositionMs((prevTime) => prevTime + 1000); // 1초마다 1초 증가
        }, 1000);
      } else {
        // 조건이 만족되지 않으면 바로 interval을 정리해줌
        clearInterval(interval);
      }
    } else {
      setIsPlaying(false);
      setPositionMs(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval); // 컴포넌트가 언마운트되거나 재생이 멈추면 clearInterval
  }, [isPlaying, deviceId, track?.duration_ms, positionMs]);

  return (
    <div className="track-player-container">
      <div className="track-player-top-navbar">
        <FontAwesomeIcon
          className="track-player-top-navbar-chevron-down"
          icon={faChevronDown}
        />
        <div className="track-player-track-album-name">
          {track?.album?.name ?? " "}
        </div>
        <FontAwesomeIcon
          className="track-player-top-navbar-ellipsis"
          icon={faEllipsis}
        />
      </div>
      <div
        className="track-player-album-img"
        style={{
          backgroundImage: `url(${track?.album?.images[0].url})`,
        }}
      ></div>
      <div className="track-player-track-info-container">
        <div className="track-player-track-name-container">
          {track?.name || " "}
        </div>
        <div className="track-player-track-artist-container">
          {track?.artists?.map((artist: any) => artist?.name).join(",") || " "}
        </div>
      </div>
      <TrackPlayerProgressBar track={track} />
      <div className="track-player-bottom-navbar">
        <FontAwesomeIcon icon={faBars} />
      </div>
    </div>
  );
};

export default TrackPlayerPage;
