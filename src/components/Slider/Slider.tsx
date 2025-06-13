import React from "react";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import Card, { CardProps } from "../Card/Card";
import { BasiceSliderResponsive } from "src/constants/sliderResponsive";
import "./Slider.style.css";
import "react-multi-carousel/lib/styles.css";

export interface SliderProps<T> {
  items: T[];
  sliderResponsive?: ResponsiveType;
  getItemProps: (item: T) => CardProps;
}

const Slider = <T,>({
  items,
  sliderResponsive,
  getItemProps,
}: SliderProps<T>): JSX.Element => {
  return (
    <div className="slider-container">
      <Carousel
        infinite
        swipeable
        draggable
        // autoPlay
        showDots={false}
        responsive={sliderResponsive || BasiceSliderResponsive}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-3-px"
        customTransition="transform 0.5s ease-in-out"
      >
        {items.map((item, idx) => (
          <Card key={idx} {...getItemProps(item)} />
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
