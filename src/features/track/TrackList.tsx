import React from "react";
import "./TrackList.style.css";
import { Track } from "@types";
import TrackItem from "./TrackItem";
import List from "src/components/List/List";

interface TrackListProps {
  tracks: Track[];
  showHeader?: boolean;
  showDuration?: boolean;
  showTrackNumber?: boolean;
  showAlbumName?: boolean;
  preferTrackNumber?: boolean;
  layout?: "vertical" | "horizontal";
}

const TrackList = ({
  tracks,
  showHeader = true,
  showDuration = true,
  showTrackNumber = false,
  preferTrackNumber = false,
  showAlbumName = true,
}: TrackListProps) => {
  return (
    <List
      showHeader={showHeader}
      items={tracks.map((track: Track, idx: number) => (
        <TrackItem
          key={idx}
          track={track}
          showDuration={showDuration}
          showTrackNumber={showTrackNumber}
          showAlbumName={showAlbumName}
          index={
            preferTrackNumber && track.track_number
              ? track.track_number
              : idx + 1
          }
        />
      ))}
    />
  );
};

export default TrackList;
