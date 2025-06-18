import { useState } from "react";
import "./TrackItem.style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useTrackPlayer } from "../../common/Player/TrackPlayerProvider/TrackPlayerProvider";
import { formatDuration } from "src/utils/player/formatDuration";
import { Album, Track } from "@types";
import PlayButton from "@features/player/PlayButton/PlayButton";

interface TrackItemProps {
  track: Track;
  index: number;
  album?: Album;
  showHeader?: boolean;
  showDuration?: boolean;
  showTrackNumber?: boolean;
  showAlbumImg?: boolean;
  showAlbumName?: boolean;
}

const TrackItem = ({
  track,
  index,
  showDuration,
  showTrackNumber,
  showAlbumImg,
  showAlbumName,
}: TrackItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setTrackPlayerIsVisible } = useTrackPlayer();
  const navigate = useNavigate();

  return (
    <div
      className="header track-row track-tab"
      onClick={() => setTrackPlayerIsVisible(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showTrackNumber && (
        <div className={`${showTrackNumber ? "column-index" : "hide-index"}`}>
          {isHovered && !showAlbumImg ? (
            <div className="hover-play-btn">
              <PlayButton
                content={track}
                showBackground={false}
                wrapperWidth="0"
                wrapperHeight="0"
                buttonColor="var(--color-white)"
                btnWidth="1rem"
                btnHeight="1rem"
                position="relative"
              />
            </div>
          ) : (
            <span>{index}</span>
          )}
        </div>
      )}

      <div className="column-title">
        {showAlbumImg && (
          <div
            className={`column-thumbnail ${
              !showTrackNumber
                ? "column-thumbnail-margin-left"
                : "column-thumbnail-no-margin"
            }`}
          >
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
              {isHovered && (
                <div className="play-btn">
                  <PlayButton
                    content={track}
                    showBackground={false}
                    buttonColor="var(--color-white)"
                    position="relative"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div
          className={`track-info ${showAlbumImg ? "margin-left" : "no-margin"}`}
        >
          <h3 className="track-name">{track.name}</h3>
          <p className="artists-name">
            {track.artists.map((a) => a.name).join(", ")}
          </p>
        </div>
      </div>

      <div className="column-info">
        <div className={`${showAlbumName ? "column-album" : "hide-index"}`}>
          <span>{track.album.name}</span>
        </div>

        <div className={`${showDuration ? "column-duration" : "hide-index"}`}>
          <span>{track.duration_ms && formatDuration(track.duration_ms)}</span>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
