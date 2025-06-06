import { Album } from "./Album";
import { Artist } from "./Artist";

export interface Track {
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  track_number: number;
  type: string; // track
  uri: string;
  duration_ms: number;
  album: Album;
  artists: Artist[];
}
