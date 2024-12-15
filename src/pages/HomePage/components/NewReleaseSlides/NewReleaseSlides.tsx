import React from "react";
import "./NewReleaseSlides.style.css";
import Alert from "react-bootstrap/Alert";
import MusicSlider from "../../../../common/Sliders/MusicSlider/MusicSlider";
import { musicSliderResponsive } from "../../../../constants/musicSliderResponsive";
import { useNewReleasesQuery } from "../../../../hooks/album/useNewReleasesQuery";
import LoadingSpinner from "../../../../common/LoadingSpinner/LoadingSpinner";

const NewReleaseSlides = () => {
  const { data, isLoading, isError, error } = useNewReleasesQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <Alert variant="danger">${error.message}</Alert>;
  }

  return (
    <div className="newRelease-music-container">
      <MusicSlider
        title="New Release"
        albums={data}
        responsive={musicSliderResponsive}
      />
    </div>
  );
};

export default NewReleaseSlides;
