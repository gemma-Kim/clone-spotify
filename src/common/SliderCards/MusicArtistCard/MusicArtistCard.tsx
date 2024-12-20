import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchQuery } from "../../../hooks/common/useSearchQuery";
import "./MusicArtistCard.style.css";

const MusicArtistCard = ({ track }: any) => {
  const artist = track?.artists[0];
  const artistName = artist?.name;
  const albumId = track?.album?.id;

  const navigate = useNavigate();
  const goToMusicDetailPage = () => {
    navigate(`albums/${albumId}`);
  };

  const { data: artistData } = useSearchQuery({
    q: artistName,
    type: "artist",
  });
  const artistImage = artistData?.artists?.items?.[0].images[0].url;
  // const artistImage = artist.images[0].url;
  if (!artist) return null;

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
