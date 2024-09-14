import React from 'react'
import { useSearchQuery } from '../../../hooks/useSearchQuery';
import './MusicArtistCard.style.css';

const MusicArtistCard = ({track}) => {

  const artist = track?.track?.artists[0];
  const artistName = artist?.name;
  
  const { data } = useSearchQuery({ q: artistName, type: "artist" });
  console.log("Pleasssss",data);
  const artistImage = data?.artists?.items?.[0].images[0].url;
  if (!track) return null;

  return (
    <div className='musicArtistCard-container'>
    <img  src={artistImage} alt={artistName} className='musicArtistCard-img'/>
    <div className='musicArtistCard-info'>
        <h2 className='musicArtistCard-artist'>{artistName}</h2>
        <button className='musicArtistCard-btn'>Tracks</button>
    </div>
    </div>  
  )
}

export default MusicArtistCard
