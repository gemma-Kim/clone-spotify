import React from "react";
import "./PlayerProgressBar.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShuffle,
  faRotateRight,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { ProgressBar } from "react-bootstrap";
import { Track } from "@types";
import {
  convertMsToSeconds,
  convertSecondsToMinutesAndSeconds,
  convertTotalTimeString,
} from "src/utils/player/timeCalculator";
import PlayButton from "../PlayButton/PlayButton";
import { usePlayer } from "@context";

interface PlayerProgressBarProps {
  track: Track;
}

const PlayerProgressBar = ({ track }: PlayerProgressBarProps) => {
  const { positionMs, durationMs } = usePlayer();

  return (
    <div
      className="player-progress-bar-container"
      style={{
        width: "flex",
        height: "flex",
      }}
    >
      <div className="player-bottom-cotroller-container">
        <FontAwesomeIcon
          className="player-bottom-cotroller-shuffle"
          icon={faShuffle}
        />
        <FontAwesomeIcon
          className="player-bottom-cotroller-previous-play"
          icon={faBackwardStep}
        />
        <PlayButton
          content={track!}
          origin={"track"}
          showBackground={false}
          btnWidth={"1.8rem"}
          btnHeight={"1.8rem"}
          buttonColor={"var(--color-white)"}
        />
        <FontAwesomeIcon
          className="player-bottom-cotroller-next-play"
          icon={faForwardStep}
        />
        <FontAwesomeIcon
          className="player-bottom-cotroller-rotate"
          // onClick={() => handleShowing()}
          icon={faRotateRight}
        />
      </div>

      <div className="player-progress-bar-time-container">
        <div style={{ display: "block" }} className="player-progress-bar-time">
          {convertTotalTimeString(
            convertSecondsToMinutesAndSeconds(convertMsToSeconds(positionMs))
          )}
        </div>
        <ProgressBar
          className="player-progress-bar"
          style={{
            height: "2px",
            display: "block",
            width: "40vw",
          }}
          variant="secondary" // 색상 추가
          now={(positionMs / durationMs) * 100}
        />
        <div style={{ display: "block" }} className="player-progress-bar-time">
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

export default PlayerProgressBar;
