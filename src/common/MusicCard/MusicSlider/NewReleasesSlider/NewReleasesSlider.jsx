import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./NewReleases.style.css"
import { musicSliderResponsive } from '../../../../constants/musicSliderResponsive';


const NewReleasesSlider = ({ title, albums }) => {

  return (
    <div>
      <h1>{title}</h1>
       
      <Carousel
        showDots={true}  // 점을 표시하도록 설정
        responsive={musicSliderResponsive}  // 반응형 설정
        infinite={true}  // 슬라이드가 무한히 순환하도록 설정
        autoPlay={true}  // 자동 재생 설정
        customTransition="all .5"  // 부드러운 전환 설정
        transitionDuration={500}  // 전환 시간 설정
        containerClass="carousel-container"  // 컨테이너 스타일 클래스
        removeArrowOnDeviceType={["tablet", "mobile"]}  // 특정 기기에서 화살표 제거
        dotListClass="custom-dot-list-style"  // 점 스타일 클래스 적용
        itemClass="carousel-item-padding-40-px"  // 슬라이드 항목 스타일 클래스
      >
        {albums.map((album) => (
          <div className="carousel-item" key={album.id}>
            <img src={album.images[0].url} alt={album.name} />
            <h2>앨범: {album.name}</h2>
            <p>가수: {album.artists[0].name}</p>
            <p> 출시일:  {album.release_date}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default NewReleasesSlider;
