import React from "react";
import Alert from "react-bootstrap/Alert";
import { musicSliderResponsive } from "../../../../constants/musicSliderResponsive";
import ArtistSlider from "../../../../common/Sliders/ArtistSlider/ArtistSlider";
import LoadingSpinner from "../../../../common/LoadingSpinner/LoadingSpinner";
import { useSearchQuery } from "../../../../hooks/common/useSearchQuery";

const ArtistSlides = () => {
  //TODO: change type from track to artist
  const {
    data: trackData,
    isLoading,
    isError,
    error,
  } = useSearchQuery({
    q: "top tracks",
    type: "track",
    limit: 20,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Alert variant="danger">(${error.message})</Alert>;
  }

  return (
    <div>
      <div className="newRelease-music-container">
        <ArtistSlider
          title="Top Artists"
          tracks={trackData?.tracks}
          responsive={musicSliderResponsive}
        />
      </div>
    </div>
  );
};

export default ArtistSlides;
