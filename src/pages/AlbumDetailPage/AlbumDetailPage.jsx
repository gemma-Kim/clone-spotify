import React from "react";
import "./AlbumDetailPage.style.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useMusicAlbumQuery } from "../../hooks/useMusicAlbumQuery";
import Alert from "react-bootstrap/Alert";

const AlbumDetailPage = () => {
  const { id } = useParams();
  const { data: albumData } = useMusicAlbumQuery({ id });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const options = { year: 'numeric', month: 'long' };
    const monthYear = date.toLocaleDateString('en-US', options);
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
          <img src={albumData?.images[1].url} alt="album-img" />
          <div className="albumDetail-info">
            <h3>Album Play List</h3>
            <h1>{albumData?.artists[0].name}</h1>
            <div className='albumDetail-info-detail'>
              <div>{formatDate(albumData?.release_date)}</div>
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
    </div>
  );
};

export default AlbumDetailPage;
