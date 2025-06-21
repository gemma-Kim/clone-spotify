import React from "react";
import "./Card.style.css";
import PlayButton from "@features/player/PlayButton/PlayButton";
import { Album, ArtistDetail, Playlist, Track } from "@types";

export interface CardProps {
  content: Track | Album | ArtistDetail | Playlist;
  title: string;
  titleFontSize?: number;
  subtitles: string[] | string;
  subtitleFontSize?: number;
  imgUrl: string;
  imgSize?: number;
  imgAlign?: "center" | "left" | "right";
  onClickHandler: () => void;
  roundImg?: boolean;
  align?: "left" | "center" | "right";
  layout?: "vertical" | "horizontal";
  width?: number | string;
  height?: number | string;
}

const Card = ({
  content,
  title,
  titleFontSize = 0.88,
  subtitles,
  subtitleFontSize = 0.67,
  imgUrl,
  imgSize = 95,
  imgAlign = "center",
  onClickHandler,
  roundImg = false,
  align = "left",
  layout = "vertical",
  width = 100,
  height = 100,
}: CardProps): JSX.Element => {
  const isHorizontal = layout === "horizontal";

  return (
    <div
      className={`card-container ${isHorizontal ? "horizontal" : ""}`}
      style={{ width: `${width}%`, height: `${height}%` }}
      onClick={onClickHandler}
    >
      {imgUrl && (
        <img
          style={{ width: `${imgSize}%` }}
          src={imgUrl}
          alt={title}
          className={`card-img align-${imgAlign} ${roundImg ? "round" : ""}`}
        />
      )}
      <div className={`card-info align-${align}`}>
        <h2
          style={{ fontSize: `${titleFontSize}rem` }}
          className="card-title text-truncate"
        >
          {title}
        </h2>
        <p
          style={{ fontSize: `${subtitleFontSize}rem` }}
          className="card-subtitle text-truncate"
        >
          {Array.isArray(subtitles)
            ? subtitles.slice(0, 2).join(", ")
            : subtitles}
        </p>
      </div>
      <div className="btn-contatiner">
        <PlayButton content={content} origin={content.type} />
      </div>
    </div>
  );
};

export default Card;
