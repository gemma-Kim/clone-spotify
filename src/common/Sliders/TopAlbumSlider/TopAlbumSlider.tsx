import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TopAlbumCard from "../../SliderCards/TopAlbumCard/TopAlbumCard";

const TopAlbumSlider = ({ title, albums, responsive }: any) => {
  if (!Array.isArray(albums.items)) {
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
          {albums.items.map((album: any, key: number) => (
            <TopAlbumCard album={album} key={key} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TopAlbumSlider;
