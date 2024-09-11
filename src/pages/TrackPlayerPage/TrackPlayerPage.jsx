import React from "react";
import "./TrackPlayerPage.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRotateRight,
  faChevronDown,
  faShuffle,
  faEllipsis,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
export const TrackPlayerPage = () => {
  let track = {};
  track.albumName = "This Is COOL";
  track.title = "해변의 여인";
  track.artistName = "cool";
  track.playTime = "03:45";
  track.mainImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB4ikhNPj7xqSQx1bFHblXbt8ZbTh3za3Wpg&s";

  return (
    <div className="track-player-container">
      <div className="track-player-top-navbar">
        <FontAwesomeIcon
          className="track-player-top-navbar-chevron-down"
          icon={faChevronDown}
        />
        <h4>{track.albumName}</h4>
        <FontAwesomeIcon
          className="track-player-top-navbar-ellipsis"
          icon={faEllipsis}
        />
      </div>
      <div
        className="track-player-album-img"
        style={{
          "background-image": `url(${track.mainImage})`,
        }}
      ></div>

      <div className="track-player-track-info-container">
        <div className="track-player-track-title-container">{`${track.title}`}</div>
        <div className="track-player-track-artist-container">{`${track.artistName}`}</div>
      </div>

      <div>player bar</div>
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
          icon={faPause}
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
        <FontAwesomeIcon
          style={{
            width: "20px",
            height: "20px",
          }}
          icon={faBars}
        />
      </div>
    </div>
  );
};
