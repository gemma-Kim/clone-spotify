import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/api/api"; // API 설정 가져오기

const fetchArtists = (artistIds) => {
  const ids = artistIds.join(",");
  return api().get(`/v1/artists`, {
    params: {
      ids,
    },
  });
};

export const useArtistsQuery = (artistIds) => {
  return useQuery({
    queryKey: ["artists", artistIds],
    queryFn: () => fetchArtists(artistIds),
    select: (res) => res.data.artists, // 응답에서 아티스트 데이터 선택
  });
};
