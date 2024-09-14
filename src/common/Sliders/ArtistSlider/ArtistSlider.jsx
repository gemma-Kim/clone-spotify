import React from 'react'
import './ArtistSlider.style.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MusicArtistCard from '../../SliderCards/MusicArtistCard/MusicArtistCard';

const ArtistSlider = ({title, tracks, responsive }) => {
    if (!Array.isArray(tracks)) {
        return <div>Error: Tracks data is not an array</div>;
      }
    
      console.log("넘어오니?", tracks);
    
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
              {tracks.length === 0 ? (
                <div>No tracks available</div>
              ) : (
                tracks.map((track, key) => <MusicArtistCard track={track} key={key} />)
              )}
            </Carousel>
          </div>
        </div>
  )
}

export default ArtistSlider
