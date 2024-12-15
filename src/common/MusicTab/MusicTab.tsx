import React, { useState } from "react";
import "./MusicTab.style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useTrackPlayer } from "../Player/TrackPlayerProvider/TrackPlayerProvider";
import { Track } from "../../hooks/player/mutation/usePlayTrackMutation";

// 재생 시간 포맷팅 함수
const formatDuration = (durationMs: number) => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

interface D {
  type: "album" | "track" | "artist";
  name: string;
  album: any;
  images: any[];
  track_number: any;
}

interface MusicTabProps {
  className?: string;
  data: Track;
}

const MusicTab: React.FC<MusicTabProps> = ({ data }: { data: any }) => {
  const [isHovered, setIsHovered] = useState(false); // hover 상태 관리
  const {
    setTrack,
    trackPlayerIsVisible,
    setTrackPlayerIsVisible,
    playNewTrack, // 트랙 플레이 함수
  } = useTrackPlayer();

  const navigate = useNavigate();
  const location = useLocation();

  // 트랙이 선택되었을 때 처리
  const handleSelectedTrack = (selectedTrack: Track) => {
    if (selectedTrack) {
      if (!trackPlayerIsVisible) setTrackPlayerIsVisible(true);
      playNewTrack(selectedTrack); // 트랙 재생
    }
  };

  const handleShowingPlayer = () => {
    if (!trackPlayerIsVisible) {
      setTrackPlayerIsVisible(true);
      setTrack(data);
    }
  };

  // 컴포넌트 렌더링
  return (
    <div className="music-tab">
      {data.type === "album" ? (
        <div
          className="album-tab"
          onClick={() => navigate(`/albums/${data.id}`)} // 앨범 클릭 시 상세 페이지로 이동
        >
          <img
            className="album-image"
            src={data.images[0].url}
            alt={data.name}
          />
          <div className="album-info">
            <h3>{data.name}</h3>
            <p>{data.artists[0].name}</p>
          </div>
        </div>
      ) : data.type === "artist" ? (
        <div className="artist-tab">
          <img
            className="artist-image"
            src={data.images[0].url}
            alt={data.name}
          />
          <div className="artist-info">
            <h3>{data.name}</h3>
            <p>Artist</p>
          </div>
        </div>
      ) : data.type === "track" ? (
        <div
          className="track-tab"
          onClick={() => handleShowingPlayer()}
          onMouseEnter={() => setIsHovered(true)} // hover 시작
          onMouseLeave={() => setIsHovered(false)} // hover 종료
        >
          <div className="track-number-or-icon">
            {isHovered ? (
              <FontAwesomeIcon
                icon={faPlay}
                onClick={() => handleSelectedTrack(data)} // 아이콘 클릭 시 트랙 재생
                className="play-icon"
              />
            ) : location.pathname.includes("album") ? (
              <span>{data.track_number}</span>
            ) : (
              <div className="default-text"></div>
            )}
          </div>

          <img
            className="track-image"
            src={data.album.images[0].url}
            alt={data.name}
          />
          <div className="track-info">
            <h3>{data.name}</h3>
            <p>{data.artists.map((artist: any) => artist.name).join(",")}</p>
          </div>
          <div className="track-duration">
            {!location.pathname.includes("search") && (
              <span>{formatDuration(data.duration_ms)}</span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MusicTab;
