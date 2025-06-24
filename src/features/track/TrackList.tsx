import "./TrackList.style.css";
import { Track } from "@types";
import TrackItem from "./TrackItem";
import List from "src/components/List/List";
import { ItemTypes } from "@spotify/web-api-ts-sdk";

interface TrackListProps {
  tracks: Track[];
  resource?: "track" | "album";
  showHeader?: boolean;
  showAlbumHeader?: boolean;
  showDuration?: boolean;
  showAlbumImg?: boolean;
  showTrackNumber?: boolean;
  showAlbumName?: boolean;
  preferTrackNumber?: boolean;
  layout?: "vertical" | "horizontal";
  origin: ItemTypes;
}

const TrackList = ({
  tracks,
  origin,
  showHeader = true,
  showAlbumHeader = true,
  showDuration = true,
  showTrackNumber = false,
  preferTrackNumber = false,
  showAlbumImg = true,
  showAlbumName = true,
}: TrackListProps) => {
  return (
    <List
      showHeader={showHeader}
      showAlbumHeader={showAlbumHeader}
      items={tracks.map((track: Track, idx: number) => (
        <TrackItem
          key={idx}
          tracks={track}
          origin={origin}
          showDuration={showDuration}
          showTrackNumber={showTrackNumber}
          showAlbumImg={showAlbumImg}
          showAlbumName={showAlbumHeader && showAlbumName}
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
