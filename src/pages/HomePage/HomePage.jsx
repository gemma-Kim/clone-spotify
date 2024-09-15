import React from "react";
import NewReleaseSlides from './components/NewReleaseSlides/NewReleaseSlides';
import ArtistSlides from './components/ArtistSlides/ArtistSlides';
import TopAlbumSlides from './components/TopAlbumSlides/TopAlbumSlides'
import Footer from './components/Footer/Footer';

const HomePage = () => {
  return (
    <div>
      <NewReleaseSlides/>
      <ArtistSlides/>
      <TopAlbumSlides/>
      <Footer/>
    </div>
  ) 
};

export default HomePage;
