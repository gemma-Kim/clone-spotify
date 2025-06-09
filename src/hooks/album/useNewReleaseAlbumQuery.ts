import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/api/api";

const fetchNewReleaseAlbum = ({
  offset = 0,
  limit = 20,
}: {
  offset: number;
  limit: number;
}) => {
  return api().get(`v1/browse/new-releases`, {
    params: {
      offset,
      limit,
    },
  });
};

export const useNewReleaseAlbumQuery = ({
  offset = 0,
  limit,
}: {
  offset?: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["new-releases"],
    queryFn: () => fetchNewReleaseAlbum({ limit, offset }),
    select: (res) => res.data.albums.items,
  });
};
