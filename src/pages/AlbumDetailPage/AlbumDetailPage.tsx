import React from "react";
import "./AlbumDetailPage.style.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faEllipsis,
  faHeart,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import Alert from "react-bootstrap/Alert";
import MusicTab from "../../common/MusicTab/MusicTab";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { useTrackQuery } from "../../hooks/track/useTrackQuery";
import { useTrackPlayer } from "../../common/Player/TrackPlayerProvider/TrackPlayerProvider";
import { Track } from "../../hooks/player/mutation/usePlayTrackMutation";
import { useAlbumQuery } from "src/hooks/album/useAlbumQuery";

const AlbumDetailPage = () => {
  const { id } = useParams();
  const {
    data: albumData,
    isLoading,
    isError,
    error,
  } = useAlbumQuery(id ?? "");

  const {
    isPlaying,
    playAlbum,
    album,
    trackPlayerIsVisible,
    setTrackPlayerIsVisible,
  } = useTrackPlayer();

  const trackIds =
    albumData?.tracks?.items?.map((track: Track) => track.id) || [];
  const { data: trackData } = useTrackQuery(trackIds);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <Alert variant="danger">(error.message)</Alert>;
  }

  const handlePlayAlbum = () => {
    playAlbum({ albumData });
    if (!trackPlayerIsVisible) {
      setTrackPlayerIsVisible(true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthYear = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
    return `${day} ${monthYear}`;
  };

  return (
    <div className="albumDetailPage">
      <div
        className="albumDetail-section"
        style={{
          backgroundImage: `url(${albumData?.images[0].url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="albumDetail-container">
          <img src={albumData?.images[1].url} />
          <div className="albumDetail-info">
            <h3>Album Play List</h3>
            <h1>{albumData?.artists[0].name}</h1>
            <div className="albumDetail-info-detail">
              <div>{formatDate(albumData?.release_date)}</div>
              <div>{albumData?.genre}</div>
              <div className="albumDetail-tracks">
                {albumData?.tracks.items.length} tracks
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="albumDetail-btnBar">
        <button className="albumDetail-btnBar-play">
          <FontAwesomeIcon
            icon={isPlaying && id === album?.id ? faPause : faPlay}
            onClick={() => handlePlayAlbum()}
          />
        </button>
        <button className="albumDetail-btnBar-heart">
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button className="albumDetail-btnBar-ellipsis">
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      </div>
      <div className="trackTabs-container">
        <div className="track-header">
          <span className="sharp">#</span>
          <FontAwesomeIcon icon={faClock} className="time-icon" />
        </div>
        {trackData?.length > 0 ? (
          trackData?.map((track: Track, index: number) => (
            <MusicTab className="track-row" key={index} data={track} />
          ))
        ) : (
          <p>There are no tracks in this album.{/* 수정 */}</p>
        )}
      </div>
    </div>
  );
};

export default AlbumDetailPage;
