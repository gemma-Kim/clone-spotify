import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";

const fetchMusicArtist = ({ id }) => {
  return api().get(`v1/artists/${id}`);
};

export const useMusicArtistQuery = ({ id }) => {
  return useQuery({
    queryKey: ["music-artist", id ],
    queryFn: () => fetchMusicArtist({ id }),
    select: (res) => res.data,
  });
};
