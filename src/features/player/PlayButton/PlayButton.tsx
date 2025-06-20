import "./PlayButton.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { Album, ArtistDetail, Playlist, Track } from "@types";
import { useTrackPlayer } from "src/common/Player/TrackPlayerProvider/TrackPlayerProvider";

interface PlayButtonProps {
  content: Track | Album | ArtistDetail | Playlist;
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
  position,
  wrapperWidth = "3.2rem",
  wrapperHeight = "3.2rem",
  btnWidth = "1.3rem",
  btnHeight = "1.3rem",
  showBackground = true,
  buttonColor = "var(--color-black)",
}: PlayButtonProps) => {
  const { track, isPlaying, playTrack, pauseTrack, playNewTrack } =
    useTrackPlayer();

  const handleClick = () => {
    if (track?.id === content?.id) {
      if (isPlaying) {
        pauseTrack();
      } else {
        playTrack();
      }
    } else {
      playNewTrack(content as Track); // content가 Track임을 보장할 수 있으면
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
        icon={isPlaying && track?.id === content?.id ? faPause : faPlay}
        onClick={handleClick}
      />
    </div>
  );
};

export default PlayButton;
