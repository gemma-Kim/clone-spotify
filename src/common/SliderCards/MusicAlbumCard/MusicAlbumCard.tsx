import React from "react";
import { useNavigate } from "react-router-dom";
import "./MusicAlbumCard.style.css";
import { Album } from "../../../types/Album";
import { formatDate } from "../../../utils/data/formatData";

const MusicAlbumCard = ({ album }: { album: Album }) => {
  const navigate = useNavigate();
  const goToMusicDetailPage = () => {
    navigate(`albums/${album.id}`);
  };

  return (
    <div className="musicCard-container" onClick={goToMusicDetailPage}>
      <img src={album?.images[0]?.url} alt="" className="musicCard-img" />
      <div className="musicCard-info">
        <h2 className="musicCard-albumName">{album?.name}</h2>
        <p className="musicCard-artist">{album?.artists[0].name}</p>
        <p className="musicCard-releaseDate">
          {formatDate(album?.release_date)}
        </p>
      </div>
    </div>
  );
};

export default MusicAlbumCard;
