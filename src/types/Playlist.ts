import { ItemTypes } from "@spotify/web-api-ts-sdk";
import { Image } from "./Image";
import { Track } from "./Track";

export interface Playlist {
  id: string;
  name: string;
  type: ItemTypes;
  description: string;
  images: Image[];
  tracks: Track[];
  uri: string;
  snapshot_id: string;
  owner: Owner;
}

export interface Owner {
  id: string;
  uri: string;
  display_name: string;
}
