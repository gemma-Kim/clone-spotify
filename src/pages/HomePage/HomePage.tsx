import React from "react";
import Footer from "../../features/homepage/Footer/Footer";
import { useNewReleasesQuery } from "../../hooks/album/useNewReleasesQuery";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { Alert } from "react-bootstrap";
import MusicSlider from "../../common/Sliders/MusicSlider/MusicSlider";
import "./HomePage.style.css";
import { useSearchQuery } from "../../hooks/common/useSearchQuery";
import TopAlbumSlider from "../../common/Sliders/TopAlbumSlider/TopAlbumSlider";
import ArtistSlider from "../../common/Sliders/ArtistSlider/ArtistSlider";

const HomePage = () => {
  const queries = [
    useNewReleasesQuery(),
    useSearchQuery({ q: "top albums", type: ["album"], limit: 20 }),
    useSearchQuery({ q: "top tracks", type: ["track"], limit: 20 }),
  ];

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const error = queries.find((q) => q.isError)?.error;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Alert variant="danger">{error?.message}</Alert>;

  const [releasedAlbums, albumData, trackData] = queries.map((q) => q.data);

  return (
    <div>
      <div className="slider-container">
        <h3>New Release</h3>
        <MusicSlider albums={releasedAlbums} />
      </div>
      <div className="slider-container">
        <h3>Top Artists</h3>
        <ArtistSlider tracks={trackData?.tracks?.items} />
      </div>
      <div className="slider-container">
        <h3>Top Albums</h3>
        <TopAlbumSlider albums={albumData?.albums?.items} />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
