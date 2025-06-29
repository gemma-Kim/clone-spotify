import { useState } from "react";
import "./TrackItem.style.css";
import { formatDuration } from "src/utils/data/formatDuration";
import { Album, Track } from "@types";
import PlayButton from "@features/player/PlayButton/PlayButton";
import { ItemTypes } from "@spotify/web-api-ts-sdk";
import { usePlayer } from "@context";

interface TrackItemProps {
  tracks: Track | Track[];
  index: number;
  album?: Album;
  showHeader?: boolean;
  showDuration?: boolean;
  showTrackNumber?: boolean;
  showAlbumImg?: boolean;
  showAlbumName?: boolean;
  origin: ItemTypes;
}

const TrackItem = ({
  tracks,
  index,
  showDuration,
  showTrackNumber,
  showAlbumImg,
  showAlbumName,
  origin,
}: TrackItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { track: playingTrack } = usePlayer();
  const [track] = Array.isArray(tracks) ? tracks : [tracks];

  return (
    <div
      className={`header track-row track-tab`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showTrackNumber && (
        <div className={`${showTrackNumber ? "column-index" : "hide-index"}`}>
          {isHovered && !showAlbumImg ? (
            <div className="hover-play-btn">
              <PlayButton
                content={Array.isArray(tracks) ? tracks : [tracks]}
                showBackground={false}
                wrapperWidth="0"
                wrapperHeight="0"
                buttonColor="var(--color-white)"
                btnWidth="1rem"
                btnHeight="1rem"
                position="relative"
                origin={origin}
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
                    content={Array.isArray(tracks) ? tracks : [tracks]}
                    showBackground={false}
                    buttonColor="var(--color-white)"
                    position="relative"
                    origin={origin}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div
          className={`track-info ${showAlbumImg ? "margin-left" : "no-margin"}`}
        >
          <h3
            className={`track-name ${
              track.id === playingTrack?.id ? "is-playing" : ""
            }`}
          >
            {track.name}
          </h3>
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
