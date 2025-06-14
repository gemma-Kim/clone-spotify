import React from "react";
import "./MediaHighlight.style.css";
import Card from "../Card/Card";
import { Album, ArtistDetail, Playlist, Track } from "@types";

interface MediaHighlightProps {
  content: Track | Album | ArtistDetail | Playlist;
}

const MediaHighlight = ({ content }: MediaHighlightProps) => {
  let title = "";
  let subtitle = "";
  let imgUrl = "";

  switch (content.type) {
    case "track":
      const track = content as Track;
      title = track.name;
      subtitle = `track · ${track.artists[0].name}`;
      imgUrl = track.album.images[0]?.url || "";

      break;
    case "album":
      const album = content as Album;
      title = album.name;
      subtitle = `album · ${album.artists[0].name}`;
      imgUrl = album.images[0]?.url || "";
      break;
    case "artist":
      const artist = content as ArtistDetail;
      title = artist.name;
      subtitle = `artist`;
      imgUrl = artist.images[0]?.url || "";
      break;
    case "playlist":
      const playlist = content as Playlist;
      title = playlist.name;
      subtitle = `playlist${
        playlist?.owner?.display_name && `· ${playlist?.owner?.display_name}`
      }`;
      imgUrl = playlist.images[0]?.url || "";
      break;
  }

  return (
    <div className="container">
      <img src={imgUrl} alt={title} className={"img"} />
      <div>
        <p className="title">{title}</p>
        <p className="subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default MediaHighlight;
