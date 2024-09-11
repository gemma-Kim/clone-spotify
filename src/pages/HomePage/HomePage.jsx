import React from "react";
import {useSearchQuery} from "../../hooks/useSearchQuery"
import NewReleases from '../../common/MusicCard/NewReleases/NewReleases.jsx';


const HomePage = () => {
 

  return (
    <div>
      <h1>Homepage</h1>

      {/* 신규앨범 슬라이드 추가 */}
      <NewReleases />
    </div>
  ) 
  
};

export default HomePage;
