import React from 'react'
import Alert from 'react-bootstrap/Alert';
import { useMusicPlaylistQuery } from '../../../../hooks/useMusicPlaylistQuery';
import {musicSliderResponsive} from '../../../../constants/musicSliderResponsive'
import TopAlbumSlider from '../../../../common/Sliders/TopAlbumSlider/TopAlbumSlider';

const TopAlbumSlides = () => {

    const {data: playlistData, isLoading, isError, error} = useMusicPlaylistQuery();
    const selectedPlaylistId = playlistData?.[1].id;

    if(isLoading){
        return <h1>loading</h1>
    }
    if(isError){
        return <Alert variant='danger'>(error.message)</Alert>
    }

  return (
    <div>
        <div className='newRelease-music-container'>
            {/* <TopAlbumSlider /> */}
            topalbumslides
        </div>
    </div>
  )
}

export default TopAlbumSlides
