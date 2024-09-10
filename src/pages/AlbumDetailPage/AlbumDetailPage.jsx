import React from 'react'
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import './AlbumDetailPage.style.css';

const AlbumDetailPage = ({ type }) => {

  const albumData = {
    name : "Espresso", //type.name
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Espresso_-_Sabrina_Carpenter.png/220px-Espresso_-_Sabrina_Carpenter.png",//type.images
    date: " 2024",//type.release_date
    artist: "Sabrina Carpenter",//type.artists.name
    genre: "Funk, Disco, Synth-pop, Pop", //type.genres
    backgroundImg: "https://georgetownvoice.com/wp-content/uploads/2024/04/Screenshot-2024-04-23-at-11.41.20%E2%80%AFAM.png"
  }

  return (
    <div className='albumDetailPage'>
      <div className='albumDetail-section'>
        <img src={albumData.backgroundImg} alt="background-img" className='albumDetail-background-img' />
        <div className='albumDetail-container'>
          <img src={albumData.image} alt="album-img" />
          <div className='albumDetail-info'>
              <h3>{type === 'playlist' ? 'Play List' : 'Artist'}</h3>
              <h1>{albumData.name}</h1>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum iste!</p>
              <div>
              {albumData.date} {albumData.genre}
              </div>
          </div>
        </div>
      </div>
      <div className='albumDetail-btnBar'>
        <button className='albumDetail-btnBar-play'><FontAwesomeIcon icon={faPlay} /></button>
        <button className='albumDetail-btnBar-heart'>{type === 'playlist' ? <FontAwesomeIcon icon={faHeart} /> : 'Follow'}</button>
        <button className='albumDetail-btnBar-ellipsis'><FontAwesomeIcon icon={faEllipsis} /></button>
      </div>
    </div>
  )
}

export default AlbumDetailPage
