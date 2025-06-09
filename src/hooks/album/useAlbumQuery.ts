import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/api/api";

const fetchAlbum = (id: string) => {
  return api().get(`v1/albums/${id}`);
};

export const useAlbumQuery = (id: string) => {
  return useQuery({
    queryKey: ["music-detail", id],
    queryFn: () => fetchAlbum(id),
    select: (res) => res.data,
  });
};
