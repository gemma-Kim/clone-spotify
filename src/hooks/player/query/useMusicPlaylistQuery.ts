import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";

const fetchMusicPlaylist = () => {
  return api().get(`v1/browse/categories/toplists/playlists`, {
    params: {
      country: "US",
      limit: 20,
    },
  });
};

export const useMusicPlaylistQuery = () => {
  return useQuery({
    queryKey: ["search-artist"],
    queryFn: () => fetchMusicPlaylist(),
    select: (res) => res.data.playlists.items,
  });
};
