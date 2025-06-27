import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";

const fetchFindPlaylistItems = (id: string) => {
  return api().get(`/v1/playlists/${id}/tracks`, {
    // params: {
    //   country: "US",
    //   limit: 20,
    // },
  });
};

export const useFindPlaylistItemsQuery = (id: string) => {
  return useQuery({
    queryKey: ["find-playlists", id],
    queryFn: () => fetchFindPlaylistItems(id),
    select: (res) => res.data,
  });
};
