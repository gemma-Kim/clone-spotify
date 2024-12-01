import React from "react";
import "./MusicSlider.style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MusicAlbumCard from "../../SliderCards/MusicAlbumCard/MusicAlbumCard";

const MusicSlider = ({ title, albums, responsive }: any) => {
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
          {albums.map((album: any, key: number) => (
            <MusicAlbumCard album={album} key={key} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MusicSlider;
