import React from 'react'
import { useNavigate } from 'react-router-dom';
import './MusicAlbumCard.style.css';

const MusicAlbumCard = ({album}) => {

    const navigate = useNavigate();
    const goToMusicDetailPage = () => {
        navigate(`albums/${album.id}`)
    }
  return (
    <div className='musicCard-container' onClick={goToMusicDetailPage}>
        <img src={album?.
            images[0].url}alt="" className='musicCard-img'/>
        <div className='musicCard-info'>
            <h2 className='musicCard-albumName'>{album?.name}</h2>
            <p className='musicCard-artist'>{album?.artists[0].name}</p>
        </div>
    </div>
  )
}

export default MusicAlbumCard
