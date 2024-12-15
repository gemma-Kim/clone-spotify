import React from "react";
import Alert from "react-bootstrap/Alert";
import { musicSliderResponsive } from "../../../../constants/musicSliderResponsive";
import TopAlbumSlider from "../../../../common/Sliders/TopAlbumSlider/TopAlbumSlider";
import LoadingSpinner from "../../../../common/LoadingSpinner/LoadingSpinner";
import { useSearchQuery } from "../../../../hooks/common/useSearchQuery";

const TopAlbumSlides = () => {
  const {
    data: albumData,
    isLoading,
    isError,
    error,
  } = useSearchQuery({
    q: "top albums",
    type: "album",
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
        <TopAlbumSlider
          title="Top Albums"
          albums={albumData?.albums}
          responsive={musicSliderResponsive}
        />
      </div>
    </div>
  );
};

export default TopAlbumSlides;
