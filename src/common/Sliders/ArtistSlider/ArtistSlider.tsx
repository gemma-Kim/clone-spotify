import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MusicArtistCard from "../../SliderCards/MusicArtistCard/MusicArtistCard";
import { Track } from "../../../types/Track";
import { ArtistDetail } from "../../../types/Artist";
import { useArtistsQuery } from "../../../hooks/artist/useArtistQuery";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { musicSliderResponsive } from "../../../constants/musicSliderResponsive";

const ArtistSlider = ({ tracks }: { tracks: Track[] }) => {
  const artists = tracks?.map((t) => t.artists[0]);
  const artistIds = artists.map((a) => a.id);

  const {
    data: artistDetails,
    isLoading,
    isError,
  } = useArtistsQuery(artistIds);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error!</div>;

  return (
    <div>
      <div className="music-slider-container">
        <Carousel
          infinite={true}
          swipeable={true}
          draggable={true}
          responsive={musicSliderResponsive}
          itemClass="carousel-item-padding-10-px"
          containerClass="carousel-container"
        >
          {tracks.length === 0 ? (
            <div>No tracks available</div>
          ) : (
            tracks?.map((track: Track, key: number) => {
              const matchedArtists: ArtistDetail[] = track.artists
                .map((artist) =>
                  artistDetails.find((ad: ArtistDetail) => ad.id === artist.id)
                )
                .filter(Boolean) as ArtistDetail[];
              return (
                <MusicArtistCard
                  track={track}
                  artists={matchedArtists}
                  key={key}
                />
              );
            })
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ArtistSlider;
