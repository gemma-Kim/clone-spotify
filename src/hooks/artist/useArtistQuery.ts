import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/api/api"; // API 설정 가져오기

const fetchArtists = (artistIds: string[]) => {
  const ids = artistIds.join(",");
  return api().get(`v1/artists`, {
    params: {
      ids,
    },
  });
};

export const useArtistsQuery = (artistIds: string[]) => {
  return useQuery({
    queryKey: ["artists", artistIds],
    queryFn: () => fetchArtists(artistIds),
    select: (res) => res.data.artists,
  });
};
