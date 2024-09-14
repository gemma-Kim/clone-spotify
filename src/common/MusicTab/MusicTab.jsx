import React from 'react';
import "./MusicTab.style.css";
import { useLocation, useNavigate } from 'react-router-dom';

const formatDuration = (durationMs) => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const MusicTab = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
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
      ) : data.type === 'artist' ? (
        <div className="artist-tab">
          <img className="artist-image" src={data?.images[0].url} alt={data?.name} />
          <div className="artist-info">
            <h3>{data?.name}</h3>
            <p>아티스트</p>
          </div>
        </div>
      ) : data.type === 'track' ? (
          <div className="track-tab">
            {!location.pathname.includes("albums") && (
              <img className="album-image" src={data?.album?.images[0].url} alt={data?.name} />                      
            )}
          <div className="track-info">
            <h3>{data?.name}</h3>
            <p>{data?.artists[0].name}</p>
          </div>
          <div className="track-duration">
            {!location.pathname.includes("search") && (                  
              <span>{formatDuration(data?.duration_ms)}</span>
            )}    
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MusicTab
