import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";

const fetchNewReleases = () => {
  return api().get(`v1/browse/new-releases`);
};

export const useNewReleasesQuery = () => {
  return useQuery({
    queryKey: ["new-releases"],
    queryFn: () => fetchNewReleases(),
    select: (res) => res.data.albums.items,
  });
};
