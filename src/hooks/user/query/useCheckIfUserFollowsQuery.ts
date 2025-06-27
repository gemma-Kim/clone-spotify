import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";

const fetchCheckIfUserFollows = (
  type: "artist" | "user" | "playlist",
  ids: string | string[]
) => {
  if (type === "playlist") {
    return api().get(`/v1/playlists/${ids}/followers/contains`, {
      // params: {
      //   type,
      //   ids: Array.isArray(ids) ? ids.join(",") : ids,
      // },
    });
  }
  return api().get(`v1/me/following/contains`, {
    params: {
      type,
      ids: Array.isArray(ids) ? ids.join(",") : ids,
    },
  });
};

export const useCheckIfUserFollowsQuery = (
  type: "artist" | "user" | "playlist",
  ids: string | string[]
): UseQueryResult<boolean[]> => {
  return useQuery({
    queryKey: ["useCheckIfUserFollows"],
    queryFn: () => fetchCheckIfUserFollows(type, ids),
    select: (result) => result.data,
  });
};
