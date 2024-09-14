import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";


const fetchMusicArtist = (artistId) => {
  return api().get(`/v1/artists/${artistId}`);
};

export const useMusicArtistQuery = (artistId) => {
  return useQuery({
    queryKey: ["artist", artistId],
    queryFn: () => fetchMusicArtist(artistId),
    select: (res) => res.data, 
  });
};
