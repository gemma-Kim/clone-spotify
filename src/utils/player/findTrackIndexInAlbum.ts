import { Album } from "@types";

export const findTrackIndexInAlbum = (
  album: Album,
  trackId: string
): number => {
  if (!trackId || !Array.isArray(album.tracks?.items)) return -1;
  return album.tracks.items.findIndex((track) => track.id === trackId);
};
