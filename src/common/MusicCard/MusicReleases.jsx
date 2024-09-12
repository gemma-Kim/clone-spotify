import React from 'react';
import { useNewReleasesQuery } from "../../hooks/useNewReleasesQuery";
import NewReleasesSlider from './MusicSlider/NewReleasesSlider/NewReleasesSlider';


const MusicReleases = () => {
  const { data: albums, isLoading, isError, error } = useNewReleasesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <NewReleasesSlider title="New Releases Albums" albums={albums} /> // 제목과 앨범 데이터만 전달 
  );
};

export default MusicReleases;
