import React from 'react';
import MusicTab from '../../common/MusicTab/MusicTab';

const MusicList = ({ items, type, handleTrackClick }) => (
  <div className="music-list">
    {items.map((item) => (
      <div key={item.id} onClick={() => handleTrackClick(item)}>
        <MusicTab data={{ ...item, type }} />
      </div>
    ))}
  </div>
);

export default MusicList;
