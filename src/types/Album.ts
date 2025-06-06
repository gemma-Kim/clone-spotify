import { Artist } from "./Artist";
import { Image } from "./Image";
import { Track } from "./Track";

export interface Album {
  id: string;
  album_type: AlbumType;
  images: Image[];
  track: Track;
  name: string;
  artists: Artist[];
  release_date: string;
}

export type AlbumType = "single";
