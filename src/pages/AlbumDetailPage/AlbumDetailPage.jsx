import React from 'react'
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import './AlbumDetailPage.style.css';

const AlbumDetailPage = ({ type }) => {
  return (
    <div className='albumDetail-section'>
      <img src={type.img} alt="background-img" className='albumDetail-background-img' />
      <div className='albumDetail-container'>
        <img src="" alt="album-img" />
        <div className='albumDetail-info'>
            <h3>{type === 'playlist' ? 'Play List' : 'Artist'}</h3>
            <h1>Album Title</h1>
            <p>Album overview</p>
            <div>
                Album detail info
            </div>
        </div>
      </div>
      <div className='albumDetail-btnBar'>
        <button><FontAwesomeIcon icon={faPlay} /></button>
        <button>{type === 'playlist' ? <FontAwesomeIcon icon={faHeart} /> : 'Follow'}</button>
        <button><FontAwesomeIcon icon={faEllipsis} /></button>
      </div>
    </div>
  )
}

export default AlbumDetailPage
