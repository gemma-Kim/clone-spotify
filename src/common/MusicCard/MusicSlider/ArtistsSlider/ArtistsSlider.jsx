import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './ArtistsSlider.style.css'; // 스타일시트 임포트
import { musicSliderResponsive } from '../../../../constants/musicSliderResponsive'; // 반응형 설정 임포트

// 숫자 형식을 변환하는 함수 (천 단위 및 백만 단위 변환)
const formatFollowers = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'; // 100만 이상인 경우 백만 단위로 변환 (예: 1.2M)
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'; // 1000 이상인 경우 천 단위로 변환 (예: 1.5K)
  }
  return num.toString(); // 1000 미만인 경우 그대로 반환
};

// 아티스트 슬라이더 컴포넌트
const ArtistsSlider = ({ title, artists }) => {
  return (
    <div className="carousel-container">
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
        {/* 각 아티스트의 데이터를 순회하여 슬라이드 항목을 생성 */}
        {artists.map((artist) => (
          <div className="carousel-item" key={artist.id}>
            <img 
              src={artist.images[0]?.url || '/placeholder-image.jpg'} 
              alt={artist.name} 
            /> {/* 아티스트 이미지가 없으면 대체 이미지를 표시 */}
            <h2>{artist.name}</h2> {/* 아티스트 이름을 표시 */}
            <p>팔로워: {formatFollowers(artist.followers.total)}</p> {/* 팔로워 수를 변환하여 표시 */}
            <p>장르: {artist.genres.join(', ')}</p> {/* 아티스트의 장르를 콤마로 구분하여 표시 */}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ArtistsSlider;
