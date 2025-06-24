import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "../../utils/api/api"; // API 설정 가져오기
import { Track } from "@types";

const fetchArtistTopTracks = (id: string) => {
  return api().get(`v1/artists/${id}/top-tracks`);
};

export const useArtistTopTracksQuery = (
  id: string
): UseQueryResult<Track[]> => {
  return useQuery({
    queryKey: ["artist-top-tracks", id],
    queryFn: () => fetchArtistTopTracks(id),
    select: (res) => res.data.tracks,
  });
};
