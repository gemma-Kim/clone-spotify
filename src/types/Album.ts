import { ItemTypes } from "@spotify/web-api-ts-sdk";
import { Artist } from "./Artist";
import { Image } from "./Image";
import { Track } from "./Track";

export interface Album {
  id: string;
  type: ItemTypes;
  album_type: AlbumType;
  images: Image[];
  tracks: {
    items: Track[];
  };
  name: string;
  artists: Artist[];
  release_date: string;
}

export type AlbumType = "single";
