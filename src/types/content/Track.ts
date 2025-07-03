import { ItemTypes } from "@spotify/web-api-ts-sdk";
import { Album } from "./Album";
import { Artist } from "./Artist";

export interface Track {
  id: string;
  type: ItemTypes;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  track_number: number;
  uri: string;
  duration_ms: number;
  album: Album;
  artists: Artist[];
}
