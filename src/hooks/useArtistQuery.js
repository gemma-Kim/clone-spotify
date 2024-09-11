import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api"; // API 설정 가져오기

// 여러 아티스트 데이터를 가져오는 함수
const fetchArtists = (artistIds) => {
  // 아티스트 ID들을 쉼표로 구분하여 쿼리에 추가
  const ids = artistIds.join(',');
  return api().get(`/v1/artists?ids=${ids}`);
};

export const useArtistsQuery = (artistIds) => {
  return useQuery({
    queryKey: ["artists", artistIds],
    queryFn: () => fetchArtists(artistIds),
    select: (res) => res.data.artists, // 응답에서 아티스트 데이터 선택
  });
};












