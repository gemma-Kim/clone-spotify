import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";

const fetchGetSeveralTracks = ({ ids }) => {
  return api().get(`v1/tracks?ids=${ids}`);
};

export const useGetSeveralTracksQuery = ({ ids }) => {
  return useQuery({
    queryKey: ["get-several-tracks",  ids ],
    queryFn: () => fetchGetSeveralTracks({ ids }),
    select: (res) => res.data.tracks,
  });
};