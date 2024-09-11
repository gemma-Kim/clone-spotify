import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../../../constants/responsive';

const MusicSlider = ({ title, albums }) => { // title과 albums 데이터를 props로 받음
  return (
    <div>
      <h1>{title}</h1> {/* title을 받아와서 동적으로 출력 */}
      <Carousel
        showDots={true} // 슬라이드 아래에 현재 슬라이드 위치를 나타내는 점(dots)을 표시    
        responsive={responsive}
        infinite={true}  // 무한 슬라이드 설정
        autoPlay={true}  // 자동 슬라이드 활성화
        customTransition="all .5" // 슬라이드 전환 애니메이션
        transitionDuration={500} // 전환 애니메이션 지속 시간 0.5초
        containerClass="carousel-container" // 슬라이드 컨테이너 클래스
        removeArrowOnDeviceType={["tablet", "mobile"]} // 태블릿 및 모바일에서 화살표 제거
        dotListClass="custom-dot-list-style" // 도트 리스트 스타일 클래스
        itemClass="carousel-item-padding-40-px" // 각 슬라이드 항목에 패딩 적용
      >
        {albums.map((album) => (
          <div className="carousel-item" key={album.id}>
            <img src={album.images[0].url} alt={album.name} />
            <h2>{album.name}</h2>
            <p>{album.artists[0].name}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MusicSlider;
