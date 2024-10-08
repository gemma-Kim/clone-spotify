import React from "react";
import Alert from "react-bootstrap/Alert";
import { useMusicPlaylistQuery } from "../../../../hooks/player/query/useMusicPlaylistQuery";
import { musicSliderResponsive } from "../../../../constants/musicSliderResponsive";
import { useMusicTrackQuery } from "../../../../hooks/track/useMusicTrackQuery";
import TopAlbumSlider from "../../../../common/Sliders/TopAlbumSlider/TopAlbumSlider";

const TopAlbumSlides = () => {
  const { data: playlistData, isLoading, isError } = useMusicPlaylistQuery();
  const selectedPlaylistId = playlistData?.[5].id;
  const { data: trackData } = useMusicTrackQuery({
    playlistId: selectedPlaylistId,
  });

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
