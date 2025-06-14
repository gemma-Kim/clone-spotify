import React from "react";
import "./Card.style.css";
export interface CardProps {
  title: string;
  titleFontSize?: number;
  subtitles: string[] | string;
  subtitleFontSize?: number;
  imgSize?: number;
  imgUrl: string;
  onClickHandler: () => void;
  roundImg?: boolean;
  buttonTitle?: string;
  align?: AlignOption;
}

const Card = ({
  title,
  titleFontSize = 0.88,
  subtitles,
  subtitleFontSize = 0.67,
  imgSize = 95,
  imgUrl,
  onClickHandler,
  buttonTitle,
  roundImg = false,
  align = "left",
}: CardProps): JSX.Element => {
  return (
    <div className={`card-container`} onClick={onClickHandler}>
      {imgUrl && (
        <img
          style={{ width: `${imgSize}%` }}
          src={imgUrl}
          alt={title}
          className={`card-img ${roundImg ? "round" : ""}`}
        />
      )}
      <div className={`card-info align-${align}`}>
        <h2
          style={{ fontSize: `${titleFontSize}rem` }}
          className={`card-title align-${align} text-truncate`}
        >
          {title}
        </h2>
        <p
          style={{ fontSize: `${subtitleFontSize}rem` }}
          className={`card-subtitle align-${align} text-truncate`}
        >
          {Array.isArray(subtitles) ? subtitles.join(",") : subtitles}
        </p>
        {buttonTitle && <button className="card-btn">{buttonTitle}</button>}
      </div>
    </div>
  );
};

export default Card;
