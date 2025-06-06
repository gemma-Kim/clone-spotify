import React from "react";
import "./MusicSlider.style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MusicAlbumCard from "../../SliderCards/MusicAlbumCard/MusicAlbumCard";
import { Album } from "../../../types/Album";
import { musicSliderResponsive } from "../../../constants/musicSliderResponsive";

const MusicSlider = ({ albums }: { albums: Album[] }) => {
  return (
    <div>
      <div className="music-slider-container">
        <Carousel
          infinite={true}
          swipeable={true}
          draggable={true}
          responsive={musicSliderResponsive}
          itemClass="carousel-item-padding-5-px"
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
