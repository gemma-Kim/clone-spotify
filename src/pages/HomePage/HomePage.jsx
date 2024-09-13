import React from "react";

import MusicReleases from "../../common/MusicCard/MusicReleases";
import MusicArtists from "../../common/MusicCard/MusicArtists";
import NewReleaseSlides from './components/NewReleaseSlides/NewReleaseSlides';

const HomePage = () => {
 
   // // 여러 아티스트 ID를 설정
   const artistIds = ['1uNFoZAHBGtllmzznpCI3s', '3TVXtAsR1Inumwj472S9r4', '6eUKZXaKkcviH0Ku9w2n3V','0TnOYISbd1XYRBk9myaseg','2CIMQHirSU0MQqyYHq0eOx','57dN52uHvrHOxijzpIgu3E','1vCWHaC5f2uS3yhpwWbIA6 ']; // 예시 아티스트 ID


  return (
    <div>
      <NewReleaseSlides/>
    </div>
  ) 
  
};

export default HomePage;
