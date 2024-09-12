import React, { useEffect, useState } from "react";
import "./TrackPlayerPage.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faChevronDown,
  faShuffle,
  faEllipsis,
  faBars,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { usePlayTrackMutation } from "../../hooks/player/usePlayTrackMutation";
import { usePauseMutation } from "../../hooks/player/usePauseMutation";
import { useDispatch, useSelector } from "react-redux";
import { loadSpotifyPlayer } from "../../utils/player/loadSpotifyPlayer";
import { useTrackQuery } from "../../hooks/player/useTrackQuery";
import TrackPlayerProgressBar from "../../common/TrackPlayerProgressBar/TrackPlayerProgressBar";

export const TrackPlayerPage = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMs, setPositionMs] = useState(0);
  const { mutate: playTrack } = usePlayTrackMutation();
  const { mutate: pausePlay } = usePauseMutation();
  const { data } = useTrackQuery(track?.id || "1ybq1nfLfpyvga0hkNXFAu");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await loadSpotifyPlayer(dispatch);
    };
    fetchData();
  }, [dispatch]);

  const deviceId = useSelector((state) => state.player.deviceId);

  useEffect(() => {
    let interval;
    if (data?.duration_ms > positionMs) {
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
  }, [isPlaying, deviceId, data?.duration_ms, positionMs]);

  const handlePlayTrack = () => {
    if (deviceId) {
      playTrack({ deviceId, positionMs, trackId: data.id });
      setIsPlaying(true);
    }
  };

  const handlePauseTrack = () => {
    if (deviceId) {
      pausePlay({ deviceId });
      setIsPlaying(false);
    }
  };

  return (
    <div className="track-player-container">
      <div className="track-player-top-navbar">
        <FontAwesomeIcon
          className="track-player-top-navbar-chevron-down"
          icon={faChevronDown}
        />
        <div className="track-player-track-album-name">
          {data?.album?.name ?? " "}
        </div>
        <FontAwesomeIcon
          className="track-player-top-navbar-ellipsis"
          icon={faEllipsis}
        />
      </div>
      <div
        className="track-player-album-img"
        style={{
          backgroundImage: `url(${data?.album?.images[0].url})`,
        }}
      ></div>
      <div className="track-player-track-info-container">
        <div className="track-player-track-name-container">
          {data?.name || " "}
        </div>
        <div className="track-player-track-artist-container">
          {data?.artists?.map((artist) => artist?.name).join(",") || " "}
        </div>
      </div>
      <TrackPlayerProgressBar
        durationMs={data?.duration_ms}
        currentTime={positionMs}
      />
      <div className="track-player-cotroller-container">
        <FontAwesomeIcon
          className="track-player-cotroller-shuffle"
          icon={faShuffle}
        />
        <FontAwesomeIcon
          className="track-player-cotroller-previous-play"
          icon={faPlay}
        />
        <FontAwesomeIcon
          className="track-player-cotroller-pause"
          icon={isPlaying ? faPause : faPlay}
          onClick={isPlaying ? handlePauseTrack : handlePlayTrack}
        />
        <FontAwesomeIcon
          className="track-player-cotroller-next-play"
          icon={faPlay}
        />
        <FontAwesomeIcon
          className="track-player-cotroller-rotate"
          icon={faRotateRight}
        />
      </div>
      <div className="track-player-bottom-navbar">
        <FontAwesomeIcon icon={faBars} />
      </div>
    </div>
  );
};
