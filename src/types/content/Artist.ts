import { ItemTypes } from "@spotify/web-api-ts-sdk";
import { Track } from "./Track";

export interface Artist {
  id: string;
  name: string;
  type: ItemTypes;
  uri: string;
  href: string;
  followers: { href: string; total: number };
  popularity: number;
  genres: any[];
}

export interface ArtistDetail extends Artist {
  images: any[];
}

export type ArtistTrackList = Track[];
