import React from 'react';
import "./MusicTab.style.css";

const MusicTab = ({title, type, time}) => {
  return (
    <div className="tab-container">
      <img className="music-image" src="https://png.pngtree.com/png-vector/20240225/ourlarge/pngtree-cute-artist-cartoon-illustration-png-image_11876619.png" alt={`${title} thumbnail`} />
      <div className="music-info">
        <h3>{title}</h3>
        <p>{type}</p>
      </div>
      <span className="music-time">{time}</span>
    </div>
  )
}

export default MusicTab
