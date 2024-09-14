import React, { useState } from "react";
import "./MusicTab.style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useTrackPlayer } from "../Player/TrackPlayerProvider/TrackPlayerProvider";

const formatDuration = (durationMs) => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const MusicTab = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    trackPlayerIsVisible,
    setTrackPlayerIsVisible,
    setTrack: setPlayerTrack,
    playNewTrack,
  } = useTrackPlayer();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleSelectedTrack = (selectedTrack) => {
    if (selectedTrack) {
      if (!trackPlayerIsVisible) setTrackPlayerIsVisible(true);
      // setPlayerTrack(selectedTrack);
      playNewTrack(selectedTrack);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="music-tab">
      {data.type === "album" ? (
        <div
          className="album-tab"
          onClick={() => navigate(`/albums/${data.id}`)}
        >
          <img
            className="album-image"
            src={data.images[0].url}
            alt={data?.name}
          />
          <div className="album-info">
            <h3>{data?.name}</h3>
            <p>{data?.artists[0].name}</p>
          </div>
        </div>
      ) : data.type === "artist" ? (
        <div className="artist-tab">
          <img
            className="artist-image"
            src={data?.images[0].url}
            alt={data?.name}
          />
          <div className="artist-info">
            <h3>{data?.name}</h3>
            <p>아티스트</p>
          </div>
        </div>
      ) : data.type === "track" ? (
        <div
          className="track-tab"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ backgroundColor: "red" }}
        >
          <div>
            {isHovered ? (
              <FontAwesomeIcon
                icon={faPlay}
                onClick={() => handleSelectedTrack(data)}
              />
            ) : location.pathname.includes("album") ? (
              <span>{data.track_number}</span>
            ) : (
              <div style={{ color: "red" }}>...</div>
            )}
          </div>

          <img
            className="track-image"
            src={data?.album?.images[0].url}
            alt={data?.name}
          />
          <div className="track-info">
            <h3>{data?.name}</h3>
            <p>{data?.artists[0].name}</p>
          </div>
          <div className="track-duration">
            {!location.pathname.includes("search") && (
              <span>{formatDuration(data?.duration_ms)}</span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MusicTab;
