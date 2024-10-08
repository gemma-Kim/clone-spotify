import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/api/api";

const fetchMusicAlbumDetail = (id: string) => {
  return api().get(`v1/albums/${id}`);
};

export const useMusicAlbumQuery = (id: string) => {
  return useQuery({
    queryKey: ["music-detail", id],
    queryFn: () => fetchMusicAlbumDetail(id),
    select: (res) => res.data,
  });
};
