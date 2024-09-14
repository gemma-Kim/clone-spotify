import React from "react";
import NewReleaseSlides from './components/NewReleaseSlides/NewReleaseSlides';
import ArtistSlides from './components/ArtistSlides/ArtistSlides';
import TopAlbumSlides from './components/TopAlbumSlides/TopAlbumSlides'

const HomePage = () => {
  return (
    <div>
      <NewReleaseSlides/>
      <ArtistSlides/>
      <TopAlbumSlides/>
    </div>
  ) 
};

export default HomePage;
