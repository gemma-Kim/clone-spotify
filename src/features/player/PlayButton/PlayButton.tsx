import "./PlayButton.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { Album, ArtistDetail, Playlist, Track } from "@types";
import { useTrackPlayer } from "src/common/Player/TrackPlayerProvider/TrackPlayerProvider";
import { ItemTypes } from "@spotify/web-api-ts-sdk";
import { findTrackIndexInAlbum } from "src/utils/player/findTrackIndexInAlbum";

interface PlayButtonProps {
  content: Track | Album | ArtistDetail | Playlist;
  wrapperWidth?: number | string;
  wrapperHeight?: number | string;
  btnWidth?: number | string;
  btnHeight?: number | string;
  showBackground?: boolean;
  buttonColor?: string;
  position?: "relative" | "absolute";
  origin: ItemTypes; // "track" | "album" | "artist" | "playlist";
}

const PlayButton = ({
  content,
  position,
  wrapperWidth = "3.2rem",
  wrapperHeight = "3.2rem",
  btnWidth = "1.3rem",
  btnHeight = "1.3rem",
  showBackground = true,
  buttonColor = "var(--color-black)",
  origin,
}: PlayButtonProps) => {
  const {
    album,
    track,
    albumTrackPosition,
    positionMs,
    isPlaying,
    playTrack,
    pauseTrack,
    playNewTrack,
    playAlbum,
  } = useTrackPlayer();

  const handleClick = () => {
    switch (origin) {
      case "track":
        if (track?.id === content?.id) {
          if (isPlaying) {
            pauseTrack();
          } else {
            playTrack();
          }
        } else {
          playNewTrack(content as Track);
        }
        break;
      case "album":
        // 현재 트랙이 현재 앨범에 속한 경우
        const contentAlbum =
          content.type === "album" ? content : (content as Track).album;

        if (album?.id === contentAlbum.id) {
          // 재생 중인 경우
          if (isPlaying) {
            if (content.type === "track") {
              const index = findTrackIndexInAlbum(album, content.id);
              playAlbum({
                album,
                position: index,
              });
            } else if (content.type === "album") {
              pauseTrack();
            }
          }
          // 재생 중이지 않은 경우
          else {
            // 같은 앨범인 경우
            if (content.type === "track") {
              const index = findTrackIndexInAlbum(album, content.id);
              playAlbum({
                album: content as Album,
                position: index,
              });
            } else if (content.type === "album") {
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
    }
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
        icon={
          isPlaying &&
          (content.type === "track"
            ? track?.id === content?.id
            : (content as Album).tracks?.items
                ?.map((i) => i.id)
                ?.find((i) => i === track!.id))
            ? faPause
            : faPlay
        }
        onClick={handleClick}
      />
    </div>
  );
};

export default PlayButton;
