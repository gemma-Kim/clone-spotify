import { useQuery } from '@tanstack/react-query'
import { api } from "../utils/api/api";

// Fetch playlist tracks
const fetchPlaylistTracks = ({ playlistId }) => {
  return api().get(`/v1/playlists/${playlistId}/tracks`, {
    params: {
      limit: 15, 
    },
  });
};

// Custom hook to fetch tracks from a playlist
export const useMusicTrackQuery = (playlistId) => {
  return useQuery({
    queryKey: ["playlist-tracks", playlistId],
    queryFn: () => fetchPlaylistTracks({ playlistId }),
    select: (res) => res.data.items, // Select only the items from the response
    enabled: !!playlistId, // Only run query if playlistId is defined
  });
}
