import React from "react";
import { useNavigate } from "react-router-dom";
import "./MusicArtistCard.style.css";
import { ArtistDetail } from "../../../types/Artist";
import { Track } from "../../../types/Track";

const MusicArtistCard = ({
  artists,
  track,
}: {
  artists: ArtistDetail[];
  track: Track;
}) => {
  const artistName = artists
    .slice(0, 3)
    .map((a) => a.name)
    .join(",");
  const albumId = track.album.id;

  const navigate = useNavigate();
  const goToMusicDetailPage = () => {
    navigate(`albums/${albumId}`);
  };

  const artistImage = artists[0]?.images[0].url;

  return (
    <div className="musicArtistCard-container" onClick={goToMusicDetailPage}>
      <img src={artistImage} alt={artistName} className="musicArtistCard-img" />
      <div className="musicArtistCard-info">
        <h2 className="musicArtistCard-artist">{artistName}</h2>
        <button className="musicArtistCard-btn">Tracks</button>
      </div>
    </div>
  );
};

export default MusicArtistCard;
