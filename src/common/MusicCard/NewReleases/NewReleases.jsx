import React from 'react';
import { useMusicSliderQuery } from "../../../hooks/useMusicSliderQuery";
import MusicSlider from '../MusicSlider/MusicSlider';


const NewReleases = () => {
  const { data: albums, isLoading, isError, error } = useMusicSliderQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <MusicSlider title="New Releases Albums" albums={albums} /> // 제목과 앨범 데이터만 전달 
  );
};

export default NewReleases;
