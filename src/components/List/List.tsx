import React from "react";
import "./LIst.style.css";

interface ListProps {
  layout?: "vertical" | "horizontal";
  showHeader?: boolean;
  showIndex?: boolean;
  gap?: number;
  items: React.ReactNode[];
}

const List = ({
  layout = "vertical",
  showHeader = true,
  showIndex = true,
  gap = 3,
  items,
}: ListProps) => {
  const isHorizontal = layout === "horizontal";
  const style = isHorizontal ? { gap: `${gap}vw` } : {};
  return (
    <div>
      {showHeader && !isHorizontal && (
        <div className={`header`}>
          {showIndex && <div className="column-index">#</div>}
          <div className="column-title">title</div>
          <div className="column-thumbnail" />
          <div className="column-album">album</div>
          <div className="column-duration">duration</div>
        </div>
      )}
      <div className={`${layout} header`} style={style}>
        {items}
      </div>
    </div>
  );
};

export default List;
