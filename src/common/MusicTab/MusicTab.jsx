import React from 'react';
import "./MusicTab.style.css";
import { useNavigate } from 'react-router-dom';

const MusicTab = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="music-tab">
      {data.type === 'album' ? (
        <div className="album-tab" onClick={() => navigate(`/albums/${data.id}`)}>
          <img className="album-image" src={data.images[0].url} alt={data?.name} />
          <div className="album-info">
            <h3>{data?.name}</h3>
            <p>{data?.artists[0].name}</p>
          </div>
        </div>
      ) : (
        <div className="artist-tab">
          <img className="artist-image" src={data?.images[0].url} alt={data?.name} />
          <div className="artist-info">
            <h3>{data?.name}</h3>
            <p>아티스트</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MusicTab
