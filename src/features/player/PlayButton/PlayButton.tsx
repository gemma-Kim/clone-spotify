import "./PlayButton.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { Album, ArtistDetail, Playlist, Track } from "@types";
import {
  findTrackIndexInAlbum,
  ifTrackExistOrNot,
} from "src/utils/player/findTrackIndexInAlbum";
import { ItemTypes } from "@spotify/web-api-ts-sdk";
import { usePlayer } from "@context";

interface PlayButtonProps {
  content: Track | Track[] | Album | ArtistDetail | Playlist;
  origin: ItemTypes;
  wrapperWidth?: number | string;
  wrapperHeight?: number | string;
  btnWidth?: number | string;
  btnHeight?: number | string;
  showBackground?: boolean;
  buttonColor?: string;
  position?: "relative" | "absolute";
}

const PlayButton = ({
  content,
  origin,
  position,
  wrapperWidth = "3.2rem",
  wrapperHeight = "3.2rem",
  btnWidth = "1.3rem",
  btnHeight = "1.3rem",
  showBackground = true,
  buttonColor = "var(--color-black)",
}: PlayButtonProps) => {
  const {
    album,
    track,
    albumTrackPosition,
    positionMs,
    isPlaying,
    playTrack,
    playTracks,
    playNewTracks,
    pauseTrack,
    playNewTrack,
    playAlbum,
  } = usePlayer();

  const handleClick = () => {
    switch (origin) {
      case "artist":
        if (Array.isArray(content)) {
          if (track?.id === content[0].id) {
            if (isPlaying) pauseTrack();
            else playTracks(content);
          } else {
            playNewTracks(content);
          }
        } else {
          if (isPlaying) pauseTrack();
          else {
            if (track?.id === content.id) playTrack();
            else playNewTrack(content as Track);
          }
        }
        break;
      case "track":
        if (track?.id === (content as Track).id) {
          if (isPlaying) pauseTrack();
          else playTrack();
        } else {
          playNewTrack(content as Track);
        }
        break;
      case "album":
        // 현재 트랙이 현재 앨범에 속한 경우
        const contentAlbum =
          !Array.isArray(content) && content.type === "album"
            ? content
            : (content as Track).album;

        if (album?.id === contentAlbum.id) {
          // 재생 중인 경우
          if (isPlaying) {
            if (!Array.isArray(content) && content.type === "track") {
              const index = findTrackIndexInAlbum(album, content.id);
              playAlbum({
                album,
                position: index,
              });
            } else if (!Array.isArray(content) && content.type === "album") {
              pauseTrack();
            }
          }
          // 재생 중이지 않은 경우
          else {
            // 같은 앨범인 경우
            if (!Array.isArray(content) && content.type === "track") {
              const index = findTrackIndexInAlbum(album, content.id);
              playAlbum({
                album: content as Album,
                position: index,
              });
            } else if (!Array.isArray(content) && content.type === "album") {
              playAlbum({
                album: content as Album,
                positionMs,
                position: albumTrackPosition,
              });
            }
          }
        } else {
          // 현재 트랙이 현재 앨범과 무관한 경우
          playAlbum({ album: contentAlbum as Album });
        }
        break;
      case "playlist":
        break;
    }
  };

  const handleIcon = () => {
    const contentType = Array.isArray(content) ? "trackList" : content?.type;
    switch (contentType) {
      case "trackList":
        if (Array.isArray(content) && ifTrackExistOrNot(content, track?.id)) {
          return isPlaying ? faPause : faPlay;
        }
        return faPlay;
      case "track":
        if (!Array.isArray(content) && track?.id === content?.id) {
          return isPlaying ? faPause : faPlay;
        }
        return faPlay;
      case "album":
        if (!Array.isArray(content) && album?.id === content?.id) {
          return isPlaying ? faPause : faPlay;
        }
        return faPlay;
      case "artist":
        if (!Array.isArray(content) && album?.id === content?.id) {
          return isPlaying ? faPause : faPlay;
        }
        return faPlay;
      case "playlist":
        break;
    }
    return faPlay;
  };

  return (
    <div
      style={{
        width: wrapperWidth,
        height: wrapperHeight,
        backgroundColor: !showBackground ? "transparent" : undefined,
        position,
      }}
      className="play-btn-contatiner"
    >
      <FontAwesomeIcon
        style={{
          width: btnWidth,
          height: btnHeight,
          backgroundColor: "transparent",
          color: buttonColor,
        }}
        icon={handleIcon()}
        onClick={handleClick}
      />
    </div>
  );
};

export default PlayButton;
