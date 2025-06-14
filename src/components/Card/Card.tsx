import React from "react";
import "./Card.style.css";

export interface CardProps {
  title: string;
  titleFontSize?: number;
  subtitles: string[] | string;
  subtitleFontSize?: number;
  imgUrl: string;
  imgSize?: number;
  imgAlign?: "center" | "left" | "right";
  onClickHandler: () => void;
  roundImg?: boolean;
  buttonTitle?: string;
  align?: "left" | "center" | "right";
  layout?: "vertical" | "horizontal";
  width?: number | string;
  height?: number | string;
}

const Card = ({
  title,
  titleFontSize = 0.88,
  subtitles,
  subtitleFontSize = 0.67,
  imgUrl,
  imgSize = 95,
  imgAlign = "center",
  onClickHandler,
  buttonTitle,
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
          {Array.isArray(subtitles) ? subtitles.join(", ") : subtitles}
        </p>
        {buttonTitle && <button className="card-btn">{buttonTitle}</button>}
      </div>
    </div>
  );
};

export default Card;
