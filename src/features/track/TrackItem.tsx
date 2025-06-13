import React, { useState } from "react";
import "./TrackItem.style.css";
import "./TrackList.style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useTrackPlayer } from "../../common/Player/TrackPlayerProvider/TrackPlayerProvider";
import { formatDuration } from "src/utils/player/formatDuration";
import { Album, Track } from "@types";

interface TrackItemProps {
  track: Track;
  index: number;
  album?: Album;
  showHeader?: boolean;
  showDuration?: boolean;
  showTrackNumber?: boolean;
  showAlbumName?: boolean;
}

const TrackItem = ({
  showHeader,
  track,
  album,
  index,
  showDuration,
  showTrackNumber,
  showAlbumName,
}: TrackItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const {
    setTrack,
    trackPlayerIsVisible,
    setTrackPlayerIsVisible,
    playNewTrack,
  } = useTrackPlayer();
  const navigate = useNavigate();
  const location = useLocation();

  const showPlayer = (track: Track) => {
    if (!trackPlayerIsVisible) setTrackPlayerIsVisible(true);
    playNewTrack(track);
  };

  return (
    <div
      className="track-row track-tab"
      onClick={() => showPlayer(track)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="column-index">
        {showTrackNumber ? (
          <div className="column-index">
            <span>{index}</span>
          </div>
        ) : (
          <span className="default-text" />
        )}
      </div>
      <div className="column-thumbnail">
        <div
          className="track-thumbnail"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            className="track-image"
            src={track.album.images[0]?.url}
            alt={track.name}
          />
          <FontAwesomeIcon
            icon={faPlay}
            className="play-btn"
            onClick={(e) => {
              e.stopPropagation();
              showPlayer(track);
            }}
          />
        </div>
      </div>
      <div className="column-title track-info">
        <h3 className="track-name">{track.name}</h3>
        <p className="artists-name">
          {track.artists.map((a) => a.name).join(", ")}
        </p>
      </div>

      <div className="column-album">
        {showAlbumName && <span>{track.album.name}</span>}
      </div>

      <div className="column-duration">
        {showDuration && (
          <span>{track.duration_ms && formatDuration(track.duration_ms)}</span>
        )}
      </div>
    </div>
  );
};

export default TrackItem;
