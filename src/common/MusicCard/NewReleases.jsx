import React from 'react';
import { useNewReleasesQuery } from "../../hooks/useNewReleasesQuery";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {responsive} from '../../constants/responsive';

const NewReleases = () => {
  const { data, isLoading, isError, error } = useNewReleasesQuery();
  console.log("data ", data)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>New Releases Albums</h1>
      <Carousel
        // swipeable={true} // 사용자가 터치나 마우스를 사용하여 슬라이드를 옆으로 스와이프할 수 있도록 허용
        // draggable={true} // 사용자가 드래그하여 슬라이드를 옮길 수 있도록 허용 (주로 마우스 드래그)
        showDots={true} // 슬라이드 아래에 현재 슬라이드 위치를 나타내는 점(dots)을 표시      
        responsive={responsive}
      
        infinite={true} // 무한 슬라이드 설정
        autoPlay={true} // 자동 슬라이드 활성화
        // autoPlay={props.deviceType !== "mobile"} // 모바일이 아닌 경우에만 자동 재생

        customTransition="all .5" // 슬라이드 전환 애니메이션
        transitionDuration={500} // 전환 애니메이션 지속 시간 0.5초
        containerClass="carousel-container" // 슬라이드 컨테이너 클래스
        removeArrowOnDeviceType={["tablet", "mobile"]} // 태블릿 및 모바일에서 화살표 제거
        dotListClass="custom-dot-list-style" // 도트 리스트 스타일 클래스
        itemClass="carousel-item-padding-40-px" // 각 슬라이드 항목에 패딩 적용
      >
        {data.map((album) => (
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

export default NewReleases;
