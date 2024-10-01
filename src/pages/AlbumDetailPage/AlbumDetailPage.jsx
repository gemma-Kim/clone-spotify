import React from "react";
import "./AlbumDetailPage.style.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useMusicAlbumQuery } from "../../hooks/album/useMusicAlbumQuery";
import Alert from "react-bootstrap/Alert";
import MusicTab from "../../common/MusicTab/MusicTab";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { useGetSeveralTracksQuery } from "../../hooks/track/useGetSeveralTracks";

const AlbumDetailPage = () => {
  const { id } = useParams();
  const {
    data: albumData,
    isLoading,
    isError,
    error,
  } = useMusicAlbumQuery({ id });

  const trackIds = albumData?.tracks?.items?.map((track) => track.id) || [];
  const trackIdsString = [...trackIds].join(",");
  const { data: trackData } = useGetSeveralTracksQuery({ ids: trackIdsString });
  console.log("trackData", trackData);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <Alert variant="danger">(error.message)</Alert>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const options = { year: "numeric", month: "long" };
    const monthYear = date.toLocaleDateString("en-US", options);
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
          <FontAwesomeIcon icon={faPlay} />
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
          trackData?.map((track, index) => (
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
