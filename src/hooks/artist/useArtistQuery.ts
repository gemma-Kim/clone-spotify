import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "../../utils/api/api";

const fetchArtists = (artistIds: string | string[]) => {
  const ids = Array.isArray(artistIds) ? artistIds.join(",") : artistIds;
  return api().get(`v1/artists`, {
    params: {
      ids,
    },
  });
};

export const useArtistsQuery = (artistIds: string | string[]) => {
  return useQuery({
    queryKey: ["artists", artistIds],
    queryFn: () => fetchArtists(artistIds),
    select: (res) => res.data.artists,
  });
};
