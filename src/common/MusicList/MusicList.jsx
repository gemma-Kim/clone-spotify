import React from 'react';
import MusicTab from '../../common/MusicTab/MusicTab';

const MusicList = ({ items, type, handleTrackClick, handleAlbumClick }) => (
  <div className="music-list">
    {items.map((item) => (
      <div 
        key={item.id} 
        onClick={() => type === 'track' ? handleTrackClick(item) : handleAlbumClick(item)}
        style={{ cursor: 'pointer' }} 
      >
        <MusicTab data={{ ...item, type }} />
      </div>
    ))}
  </div>
);

export default MusicList;
