import React from "react";
import "./Card.style.css";
export interface CardProps {
  title: string;
  subtitles: string[] | string;
  imgUrl: string;
  onClickHandler: () => void;
  roundImg?: boolean;
  buttonTitle?: string;
  align?: AlignOption;
}

const Card = ({
  subtitles,
  title,
  imgUrl,
  onClickHandler,
  buttonTitle,
  roundImg = false,
  align = "left",
}: CardProps): JSX.Element => {
  return (
    <div className="card-container" onClick={onClickHandler}>
      {imgUrl && (
        <img
          src={imgUrl}
          alt={title}
          className={`card-img ${roundImg ? "round" : ""}`}
        />
      )}
      <div className={`card-info align-${align}`}>
        <h2 className={`card-title align-${align} text-truncate`}>{title}</h2>
        <p className={`card-subtitle align-${align} text-truncate`}>
          {Array.isArray(subtitles) ? subtitles.join(",") : subtitles}
        </p>
        {buttonTitle && <button className="card-btn">{buttonTitle}</button>}
      </div>
    </div>
  );
};

export default Card;
