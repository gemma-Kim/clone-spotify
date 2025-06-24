import React from "react";
import "./HomePage.style.css";
import Footer from "../../common/Footer/Footer";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { Alert } from "react-bootstrap";
import { useSearchQuery } from "../../hooks/common/useSearchQuery";
import { useNewReleaseAlbumQuery } from "@hooks/album";
import Slider from "src/components/Slider/Slider";
import { Album, Artist, ArtistDetail, Track } from "@types";
import { useNavigate } from "react-router-dom";
import { useArtistsQuery } from "@hooks";

const HomePage = () => {
  const navigate = useNavigate();
  const newReleaseRes = useNewReleaseAlbumQuery({ limit: 50 });
  const topAlbumRes = useSearchQuery({
    q: "top albums",
    type: ["album"],
    limit: 50,
  });
  const topTrackRes = useSearchQuery({
    q: "top tracks",
    type: ["track"],
    limit: 50,
  });

  const isLoading = [newReleaseRes, topAlbumRes, topTrackRes].some(
    (q) => q.isLoading
  );
  const isError = [newReleaseRes, topAlbumRes, topTrackRes].some(
    (q) => q.isError
  );
  const error = [newReleaseRes, topAlbumRes, topTrackRes].find(
    (q) => q.isError
  )?.error;

  const releasedAlbums = newReleaseRes.data ?? [];
  const albums = topAlbumRes?.data?.albums?.items;
  const tracks = topTrackRes?.data?.tracks?.items;

  const artistIds = Array.from(
    new Set(
      tracks?.map((t: Track) => t.artists[0]).map((a: Artist) => a.id) ?? []
    )
  ) as string[];

  const {
    data: artistDetails,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useArtistsQuery(artistIds);

  if (isLoading || isLoading2) return <LoadingSpinner />;
  if (isError || isError2)
    return <Alert variant="danger">{(error || error2)?.message}</Alert>;

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        <h3>New Release</h3>
        <Slider
          items={releasedAlbums}
          getItemProps={(album: Album) => ({
            content: album,
            title: album.name,
            subtitles: album.artists
              .slice(0, 2)
              .map((a) => a.name)
              .join(", "),
            imgUrl: album.images[0].url,
            onClickHandler: () => navigate(`albums/${album.id}`),
          })}
        />
      </div>
      <div className="slider-container">
        <h3>Top Artists</h3>
        <Slider
          items={tracks}
          getItemProps={(track: Track) => {
            const matchedArtists: ArtistDetail[] = track.artists
              .map(
                (artist) =>
                  artistDetails &&
                  artistDetails.find((ad: ArtistDetail) => ad.id === artist.id)
              )
              .filter(Boolean) as ArtistDetail[];
            return {
              content: track,
              title: matchedArtists.map((ma) => ma.name).join(","),
              onClickHandler: () => navigate(`albums/${track.album.id}`),
              subtitles: "",
              buttonTitle: "Tracks",
              imgUrl: track.album.images[0].url,
              align: "center",
              roundImg: true,
            };
          }}
        />
      </div>
      <div className="slider-container">
        <h3>Top Albums</h3>
        <Slider
          items={albums}
          getItemProps={(album: Album) => ({
            content: album,
            title: album.name,
            subtitles: album.artists
              .slice(0, 2)
              .map((a) => a.name)
              .join(", "),
            imgUrl: album.images[0].url,
            onClickHandler: () => navigate(`albums/${album.id}`),
          })}
        />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
