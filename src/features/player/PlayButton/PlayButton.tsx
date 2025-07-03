import "./PlayButton.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { Album, Artist, ArtistDetail, Playlist, Track } from "@types";
import {
  findTrackIndexInContent,
  ifTrackExistOrNot,
} from "src/utils/player/findTrackIndexInContent";
import { ItemTypes } from "@spotify/web-api-ts-sdk";
import { usePlayer } from "src/contexts";

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
    artist,
    playlist,
    albumTrackPosition,
    playlistTrackPosition,
    positionMs,
    isPlaying,
    playTrack,
    playTracks,
    playNewTracks,
    pauseTrack,
    playNewTrack,
    playAlbum,
    playArtist,
    playPlaylist,
  } = usePlayer();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
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
          if (artist?.id === content?.id) {
            if (isPlaying) pauseTrack();
            else {
              playArtist({ artist: content as Artist, positionMs });
            }
          } else {
            playArtist({ artist: content as Artist });
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
              const index = findTrackIndexInContent(album, content.id);
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
              const index = findTrackIndexInContent(album, content.id);
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
        if (Array.isArray(content)) {
          if (track?.id === content[0].id) {
            if (isPlaying) pauseTrack();
            else playTracks(content);
          } else {
            playNewTracks(content);
          }
        } else {
          if (playlist?.id === content?.id) {
            if (isPlaying) pauseTrack();
            else {
              playPlaylist({
                playlist: content as Playlist,
                positionMs,
                position: playlistTrackPosition,
              });
            }
          } else {
            playPlaylist({ playlist: content as Playlist });
          }
        }
        break;
    }
  };

  const handleIcon = () => {
    switch (origin) {
      case "track":
        if (!Array.isArray(content) && track?.id === content?.id) {
          return isPlaying ? faPause : faPlay;
        }
        break;
      case "album":
        if (!Array.isArray(content) && album?.id === content?.id) {
          return isPlaying ? faPause : faPlay;
        } else if (Array.isArray(content)) return faPlay;
        break;
      case "artist":
        if (Array.isArray(content) && ifTrackExistOrNot(content, track?.id)) {
          return isPlaying ? faPause : faPlay;
        } else if (!Array.isArray(content) && artist?.id === content?.id) {
          return isPlaying ? faPause : faPlay;
        }
        break;
      case "playlist":
        if (!Array.isArray(content) && playlist?.id === content?.id) {
          return isPlaying ? faPause : faPlay;
        } else if (
          Array.isArray(content) &&
          ifTrackExistOrNot(content, track?.id)
        ) {
          return isPlaying ? faPause : faPlay;
        }
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
      onClick={handleClick}
    >
      <FontAwesomeIcon
        style={{
          width: btnWidth,
          height: btnHeight,
          backgroundColor: "transparent",
          color: buttonColor,
        }}
        icon={handleIcon()}
      />
    </div>
  );
};

export default PlayButton;
