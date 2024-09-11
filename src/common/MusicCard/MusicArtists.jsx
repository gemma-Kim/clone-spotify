
import React from 'react';
import { useArtistsQuery } from '../../hooks/useArtistQuery'; 
import ArtistsSlider from './MusicSlider/ArtistsSlider/ArtistsSlider';


const MusicArtists = ({ artistIds }) => {
  const { data: artists, isLoading, isError, error } = useArtistsQuery(artistIds);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <ArtistsSlider title="Top Artists" artists={artists} /> // 제목과 아티스트데이터만 전달 
  );
};
export default MusicArtists;






