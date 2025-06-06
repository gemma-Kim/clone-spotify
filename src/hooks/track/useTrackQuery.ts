import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/api/api";

const fetchGetTracks = (ids: string | string[]) => {
  return api().get(`v1/tracks`, {
    params: {
      ids: Array.isArray(ids) ? ids.join(",") : ids,
    },
  });
};

export const useTrackQuery = (ids: string | string[]) => {
  return useQuery({
    queryKey: ["get-several-tracks", ids],
    queryFn: () => fetchGetTracks(ids),
    select: (res) => res.data.tracks,
  });
};
