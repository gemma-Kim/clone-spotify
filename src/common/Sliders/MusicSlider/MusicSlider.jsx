import React from 'react'
import './MusicSlider.style.css';
import MusicAlbumCard from '../../SliderCards/MusicAlbumCard/MusicAlbumCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const MusicSlider = ({title, albums, responsive }) => {
    console.log("여긴?", albums);
  return (
    <div>
      <div className='music-slider-container'>
       <h3>{title}</h3>
        <Carousel
            infinite={true}
            swipeable={true}
            draggable={true}
            responsive={responsive}
            itemClass="carousel-item-padding-10-px"
            containerClass="carousel-container"
        >
            {albums.map((album, key)=> <MusicAlbumCard album={album} key={key}/>)}
        </Carousel>
      </div>
    </div>
  )
}

export default MusicSlider
