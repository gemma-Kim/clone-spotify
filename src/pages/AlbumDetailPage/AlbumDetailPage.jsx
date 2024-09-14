import React from "react";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faClock } from '@fortawesome/free-regular-svg-icons';
import "./AlbumDetailPage.style.css";
import { useMusicAlbumQuery } from "../../hooks/useMusicAlbumQuery";
import MusicTab from '../../common/MusicTab/MusicTab';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';

const AlbumDetailPage = () => {
  const { id } = useParams();
  const { data: albumData, isLoading, isError, error } = useMusicAlbumQuery({ id });
  console.log("albumData", albumData?.tracks?.items);

  if(isLoading){
    return <LoadingSpinner/>
  }
  if(isError){
      return <Alert variant='danger'>(error.message)</Alert>
  }

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
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
              iste!
            </p>
            <div className='albumDetail-info-detail'>
              <div>{albumData?.release_date}</div>
              <div>{albumData?.genre}</div>
              <div className='albumDetail-tracks'>{albumData?.tracks.items.length} tracks</div>
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
          <div className="track-header-info">
            <span>제목</span>
            <FontAwesomeIcon icon={faClock} className="time-icon"/>
          </div>
        </div>
        {albumData?.tracks?.items.length > 0 ? (
          albumData?.tracks?.items.map((track, index) => (
            <div className="track-row" key={track.id}>
              <span>{index + 1}</span>
              <MusicTab data={track} />
          </div>
        ))
        ): (
            <p>이 앨범에 트랙이 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default AlbumDetailPage;
