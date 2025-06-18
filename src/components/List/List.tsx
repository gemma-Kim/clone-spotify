import React from "react";
import "./LIst.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

interface ListProps {
  layout?: "vertical" | "horizontal";
  showHeader?: boolean;
  showIndex?: boolean;
  showAlbumHeader?: boolean;
  gap?: number;
  items: React.ReactNode[];
}

const List = ({
  layout = "vertical",
  showHeader = true,
  showIndex = true,
  showAlbumHeader = true,
  gap = 3,
  items,
}: ListProps) => {
  const isHorizontal = layout === "horizontal";
  const style = isHorizontal ? { gap: `${gap}vw` } : {};
  return (
    <div>
      {showHeader && !isHorizontal && (
        <div className={`header`}>
          {showIndex && (
            <div className={`${showIndex ? "column-index" : "hide-index"}`}>
              #
            </div>
          )}

          <div className="column-title">title</div>

          <div className="column-info">
            {showAlbumHeader && (
              <div
                className={`${showAlbumHeader ? "column-album" : "hide-index"}`}
              >
                album
              </div>
            )}

            <div className="column-duration">
              <FontAwesomeIcon icon={faClock} />
            </div>
          </div>
        </div>
      )}
      <div className={`${layout} header`} style={style}>
        {items}
      </div>
    </div>
  );
};

export default List;
