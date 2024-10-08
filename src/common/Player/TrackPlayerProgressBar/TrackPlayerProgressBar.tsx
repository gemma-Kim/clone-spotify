import React, { useEffect } from "react";
import "./TrackPlayerProgressBar.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faShuffle,
  faRotateRight,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import {
  convertMsToSeconds,
  convertSecondsToMinutesAndSeconds,
  convertTotalTimeString,
} from "../../../utils/player/timeCalculator";

import { useSelector } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import { useTrackPlayer } from "../TrackPlayerProvider/TrackPlayerProvider";
import { Track } from "../../../hooks/player/mutation/usePlayTrackMutation";

// styleType 이 fit 인 경우 >> 재생 버튼만 노출
const TrackPlayerProgressBar = ({
  track,
}: {
  track: Track | null;
  className?: string;
}) => {
  const {
    isPlaying,
    setIsPlaying,
    playTrack,
    pauseTrack,
    positionMs,
    setPositionMs,
    durationMs,
    setTrackPlayerIsVisible,
  } = useTrackPlayer();

  const deviceId = useSelector((state: any) => state.player.deviceId);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (durationMs > positionMs) {
      if (isPlaying && deviceId) {
        interval = setInterval(() => {
          setPositionMs((prevTime: number) => prevTime + 1000); // 1초마다 1초 증가
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

  const handleShowing = () => {
    setTrackPlayerIsVisible(false);
  };

  return (
    <div
      className="track-player-progress-bar-container"
      style={{
        width: "flex",
        height: "flex",
      }}
    >
      <div className="track-player-bottom-cotroller-container">
        <FontAwesomeIcon
          className="track-player-bottom-cotroller-shuffle"
          // style={{ display: "block" }}
          icon={faShuffle}
        />
        <FontAwesomeIcon
          className="track-player-bottom-cotroller-previous-play"
          // style={{ display: "block" }}
          icon={faBackwardStep}
        />
        <FontAwesomeIcon
          className="track-player-bottom-cotroller-main"
          icon={isPlaying ? faPause : faPlay}
          onClick={isPlaying ? pauseTrack : playTrack}
        />
        <FontAwesomeIcon
          className="track-player-bottom-cotroller-next-play"
          icon={faForwardStep}
        />
        <FontAwesomeIcon
          className="track-player-bottom-cotroller-rotate"
          onClick={() => handleShowing()}
          icon={faRotateRight}
        />
      </div>

      <div className="track-player-progress-bar-time-container">
        <div
          style={{ display: "block" }}
          className="track-player-progress-bar-time"
        >
          {convertTotalTimeString(
            convertSecondsToMinutesAndSeconds(convertMsToSeconds(positionMs))
          )}
        </div>
        <ProgressBar
          className="track-player-progress-bar"
          style={{
            height: "2px",
            display: "block",
          }}
          variant="secondary" // 색상 추가
          now={(positionMs / durationMs) * 100} /*percentage}*/
        />
        <div
          style={{ display: "block" }}
          className="track-player-progress-bar-time"
        >
          {convertTotalTimeString(
            convertSecondsToMinutesAndSeconds(
              convertMsToSeconds(durationMs - positionMs)
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackPlayerProgressBar;
