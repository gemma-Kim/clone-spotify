import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MusicArtistCard from "../../SliderCards/MusicArtistCard/MusicArtistCard";

const ArtistSlider = ({ title, tracks, responsive }: any) => {
  if (!Array.isArray(tracks)) {
    return <div>Error: Tracks data is not an array</div>;
  }

  return (
    <div>
      <div className="music-slider-container">
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
            tracks.map((track, key) => (
              <MusicArtistCard track={track} key={key} />
            ))
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ArtistSlider;
