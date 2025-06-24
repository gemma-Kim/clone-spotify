import { Album, Track } from "@types";

export const findTrackIndexInAlbum = (
  album: Album,
  trackId: string
): number => {
  if (!trackId || !Array.isArray(album.tracks?.items)) return -1;
  return album.tracks.items.findIndex((track) => track.id === trackId);
};

export const ifTrackExistOrNot = (
  tracks: Track[],
  trackId?: string
): boolean => {
  if (!trackId) return false;
  return tracks?.findIndex((t: Track) => t.id === trackId) !== -1;
};
