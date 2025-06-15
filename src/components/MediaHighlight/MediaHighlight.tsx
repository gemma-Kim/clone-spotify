import React from "react";
import "./MediaHighlight.style.css";
import { Album, ArtistDetail, Playlist, Track } from "@types";
import PlayButton from "@features/player/PlayButton/PlayButton";
import { getMediaInfo } from "src/utils/data/getMediaInfo";

interface MediaHighlightProps {
  content: Track | Album | ArtistDetail | Playlist;
}

const MediaHighlight = ({ content }: MediaHighlightProps) => {
  const { title, subtitle, imgUrl } = getMediaInfo(content);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="media-info">
          <img src={imgUrl} alt={title} className={"img"} />
          <div>
            <p className="title">{title}</p>
            <p className="subtitle">{subtitle}</p>
          </div>
        </div>
        <div className="btn-contatiner">
          <PlayButton content={content} />
        </div>
      </div>
    </div>
  );
};

export default MediaHighlight;
