import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";

const fetchFindPlaylist = (id: string) => {
  return api().get(`/v1/playlists/${id}`, {
    // params: {
    //   country: "US",
    //   limit: 20,
    // },
  });
};

export const useFindPlaylistQuery = (id: string) => {
  return useQuery({
    queryKey: ["find-playlist", id],
    queryFn: () => fetchFindPlaylist(id),
    select: (res) => res.data,
  });
};
