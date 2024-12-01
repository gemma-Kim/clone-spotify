import React from "react";
import { useNavigate } from "react-router-dom";

const TopAlbumCard = ({ album }: any) => {
  const navigate = useNavigate();
  const goToMusicDetailPage = () => {
    navigate(`albums/${album?.track?.album?.id}`);
  };

  return (
    <div className="musicCard-container" onClick={goToMusicDetailPage}>
      <img
        src={album?.track?.album?.images[0]?.url}
        alt=""
        className="musicCard-img"
      />
      <div className="musicCard-info">
        <h2 className="musicCard-albumName">{album?.track?.album?.name}</h2>
        <p className="musicCard-artist">
          {album?.track?.album?.artists[0].name}
        </p>
      </div>
    </div>
  );
};

export default TopAlbumCard;
