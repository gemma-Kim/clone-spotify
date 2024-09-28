import React from "react";
import Alert from "react-bootstrap/Alert";
import { useMusicPlaylistQuery } from "../../../../hooks/useMusicPlaylistQuery";
import { musicSliderResponsive } from "../../../../constants/musicSliderResponsive";
import { useMusicTrackQuery } from "../../../../hooks/useMusicTrackQuery";
import TopAlbumSlider from "../../../../common/Sliders/TopAlbumSlider/TopAlbumSlider";

const TopAlbumSlides = () => {
  const {
    data: playlistData,
    isLoading,
    isError,
    error,
  } = useMusicPlaylistQuery();
  const selectedPlaylistId = playlistData?.[5].id;
  const { data: trackData } = useMusicTrackQuery(selectedPlaylistId);

  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (isError) {
    return <Alert variant="danger">(error.message)</Alert>;
  }

  return (
    <div>
      <div className="newRelease-music-container">
        <TopAlbumSlider
          title="Top Albums"
          albums={trackData}
          responsive={musicSliderResponsive}
        />
      </div>
    </div>
  );
};

export default TopAlbumSlides;
