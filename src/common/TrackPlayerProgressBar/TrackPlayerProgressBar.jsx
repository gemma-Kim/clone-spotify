import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "./TrackPlayerProgressBar.style.css";
import {
  convertMsToSeconds,
  convertSecondsToMinutesAndSeconds,
  convertTotalTimeString,
} from "../../utils/player/timeCalculator";

const TrackPlayerProgressBar = ({ durationMs = 0, currentTime = 0 }) => {
  // 재생 시간을 백분율로 계산
  const percentage = (currentTime / durationMs) * 100;

  const [currentTimeFormatted, setCurrentTimeFormatted] = useState(
    convertSecondsToMinutesAndSeconds(convertMsToSeconds(currentTime))
  );

  const [remainingTime, setRemainingTime] = useState(
    convertSecondsToMinutesAndSeconds(
      convertMsToSeconds(durationMs - currentTime)
    )
  );

  useEffect(() => {
    // 현재 재생 시간과 남은 시간을 업데이트
    if (percentage < 100) {
      setRemainingTime(
        convertSecondsToMinutesAndSeconds(
          convertMsToSeconds(durationMs - currentTime)
        )
      );
    }

    setCurrentTimeFormatted(
      convertSecondsToMinutesAndSeconds(convertMsToSeconds(currentTime))
    );
  }, [currentTime, durationMs]);

  return (
    <div className="track-player-progress-bar-container">
      <ProgressBar
        className="track-player-progress-bar"
        style={{ height: "1px" }}
        now={percentage}
      />
      <div className="track-player-progress-bar-time-container">
        {/* 현재 시간 */}
        <p>{convertTotalTimeString(currentTimeFormatted)}</p>
        {/* 남은 시간 */}
        <p>{convertTotalTimeString(remainingTime)}</p>
      </div>
    </div>
  );
};

export default TrackPlayerProgressBar;
