import React from "react";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import "./AlbumDetailPage.style.css";
import { useMusicAlbumQuery } from "../../hooks/useMusicAlbumQuery";

const AlbumDetailPage = ({ type }) => {
  const { id } = useParams();
  const { data: albumData } = useMusicAlbumQuery({ id });

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
            <h3>{type === "playlist" ? "Play List" : "Artist"}</h3>
            <h1>{albumData?.artists[0].name}</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
              iste!
            </p>
            <div>
              {albumData?.release_date} {albumData?.genre} /{" "}
              {albumData?.tracks.items.length} tracks
            </div>
          </div>
        </div>
      </div>
      <div className="albumDetail-btnBar">
        <button className="albumDetail-btnBar-play">
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button className="albumDetail-btnBar-heart">
          {type === "playlist" ? <FontAwesomeIcon icon={faHeart} /> : "Follow"}
        </button>
        <button className="albumDetail-btnBar-ellipsis">
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      </div>
    </div>
  );
};

export default AlbumDetailPage;
