import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/api/api";

const fetchPlaylistTracks = ({ playlistId, limit = 20 }) => {
  return api().get(`/v1/playlists/${playlistId}/tracks`, {
    params: {
      limit,
    },
  });
};

export const useMusicTrackQuery = ({ playlistId, limit = 20 }) => {
  return useQuery({
    queryKey: ["playlist-tracks", playlistId],
    queryFn: () => fetchPlaylistTracks({ playlistId, limit }),
    select: (res) => res.data.items,
    enabled: !!playlistId,
  });
};