import { Album, Playlist, Track } from "@types";

export const findTrackIndexInContent = (
  content: Album | Playlist,
  trackId: string
): number => {
  if (content?.type === "album") {
    if (!trackId || !Array.isArray(content.tracks?.items)) return -1;
    return (content as Album).tracks.items.findIndex(
      (track) => track.id === trackId
    );
  } else if (content?.type === "playlist") {
    const trackData: Track[] = (content as Playlist)?.tracks?.items.map(
      (i: any) => i.track
    );
    return trackData.findIndex((track) => track.id === trackId);
  }
  return -1;
};

export const ifTrackExistOrNot = (
  tracks: Track[],
  trackId?: string
): boolean => {
  if (!trackId) return false;
  return tracks?.findIndex((t: Track) => t.id === trackId) !== -1;
};
