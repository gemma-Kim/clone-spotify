import { ItemTypes } from "@spotify/web-api-ts-sdk";
import { Image } from "./Image";
import { Track } from "./Track";

export interface Playlist {
  id: string;
  name: string;
  type: ItemTypes;
  description: string;
  images: Image[];
  tracks: {
    items: { track: Track }[];
    total: number;
    href: string;
    limit: number;
    offset: number;
  };
  uri: string;
  snapshot_id: string;
  owner: Owner;
  public: boolean;
}

export interface Owner {
  id: string;
  uri: string;
  display_name: string;
}
