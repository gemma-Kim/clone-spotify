import React from "react";
import "./TrackPlayerProgressBar.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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

import { ProgressBar } from "react-bootstrap";
import { useTrackPlayer } from "../TrackPlayerProvider/TrackPlayerProvider";
import { Track } from "@types";
import PlayButton from "@features/player/PlayButton/PlayButton";

interface TrackPlayerProgressBarProps {
  track: Track;
}

const TrackPlayerProgressBar = ({ track }: TrackPlayerProgressBarProps) => {
  const { positionMs, durationMs, setTrackPlayerIsVisible } = useTrackPlayer();

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
          icon={faShuffle}
        />
        <FontAwesomeIcon
          className="track-player-bottom-cotroller-previous-play"
          icon={faBackwardStep}
        />
        <PlayButton
          content={track!}
          showBackground={false}
          btnWidth={"1.8rem"}
          btnHeight={"1.8rem"}
          buttonColor={"var(--color-white)"}
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
            width: "40vw",
          }}
          variant="secondary" // 색상 추가
          now={(positionMs / durationMs) * 100}
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
