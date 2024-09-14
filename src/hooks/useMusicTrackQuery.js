import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";

const fetchPlaylistTracks = ({ playlistId }) => {
  return api().get(`/v1/playlists/${playlistId}/tracks`, {
    params: {
      limit: 20,
    },
  });
};

export const useMusicTrackQuery = (playlistId) => {
  return useQuery({
    queryKey: ["playlist-tracks", playlistId],
    queryFn: () => fetchPlaylistTracks({ playlistId }),
    select: (res) => res.data.items,
    enabled: !!playlistId,
  });
};
