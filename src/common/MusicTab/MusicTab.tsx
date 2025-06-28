import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { formatDuration } from "src/utils/data/formatDuration";
import { Album, ArtistDetail, Track } from "@types";
import { usePlayer } from "@context";

interface MusicTabProps {
  item: Track | Album | ArtistDetail;
}

const MusicTab = ({ item }: MusicTabProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playNewTrack } = usePlayer();
  const navigate = useNavigate();
  const location = useLocation();

  const showPlayer = (track: Track) => {
    playNewTrack(track);
  };

  if (item.type === "album") {
    const album = item as Album;
    return (
      <div
        className="album-tab"
        onClick={() => navigate(`/albums/${album.id}`)}
      >
        <img
          className="album-image"
          src={album.images[0]?.url}
          alt={album.name}
        />
        <div className="album-info">
          <h3>{album.name}</h3>
          <p>{album.artists.map((a) => a.name).join(", ")}</p>
        </div>
      </div>
    );
  }

  if (item.type === "artist") {
    const artist = item as ArtistDetail;
    return (
      <div
        className="artist-tab"
        onClick={() => navigate(`/artists/${artist.id}`)}
      >
        <img
          className="artist-image"
          src={artist.images[0]?.url}
          alt={artist.name}
        />
        <div className="artist-info">
          <h3>{artist.name}</h3>
          <p>Artist</p>
        </div>
      </div>
    );
  }

  if (item.type === "track") {
    const track = item as Track;
    return (
      <div
        className="track-tab"
        onClick={() => showPlayer(track)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="track-number-or-icon">
          {isHovered ? (
            <FontAwesomeIcon
              icon={faPlay}
              className="play-icon"
              onClick={(e) => {
                e.stopPropagation();
                showPlayer(track);
              }}
            />
          ) : location.pathname.includes("album") ? (
            <span>{track.track_number}</span>
          ) : (
            <span className="default-text" />
          )}
        </div>

        <img
          className="track-image"
          src={track.album.images[0]?.url}
          alt={track.name}
        />
        <div className="track-info">
          <h3>{track.name}</h3>
          <p>{track.artists.map((a) => a.name).join(", ")}</p>
        </div>
        <div className="track-duration">
          {!location.pathname.includes("search") && (
            <span>
              {track.duration_ms && formatDuration(track.duration_ms)}
            </span>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default MusicTab;
