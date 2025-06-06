import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TopAlbumCard from "../../SliderCards/TopAlbumCard/TopAlbumCard";
import { musicSliderResponsive } from "../../../constants/musicSliderResponsive";
import { Album } from "../../../types/Album";

const TopAlbumSlider = ({ albums }: { albums: Album[] }) => {
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
            <TopAlbumCard album={album} key={key} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TopAlbumSlider;
