import React from "react";
import Alert from "react-bootstrap/Alert";
import { useMusicPlaylistQuery } from "../../../../hooks/player/query/useMusicPlaylistQuery";
import { musicSliderResponsive } from "../../../../constants/musicSliderResponsive";
import { useMusicTrackQuery } from "../../../../hooks/track/useMusicTrackQuery";
import ArtistSlider from "../../../../common/Sliders/ArtistSlider/ArtistSlider";

const ArtistSlides = () => {
  const {
    data: playlistData,
    isLoading,
    isError,
    error,
  } = useMusicPlaylistQuery();
  const selectedPlaylistId = playlistData?.[0].id;
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
        <ArtistSlider
          title="Top Artists"
          tracks={trackData}
          responsive={musicSliderResponsive}
        />
      </div>
    </div>
  );
};

export default ArtistSlides;
