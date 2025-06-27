import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";

const fetchUserFollowedArtists = () => {
  return api().get(`v1/me/following?type=artist`);
};

export const useUserFollowedArtistsQuery = () => {
  return useQuery({
    queryKey: ["userFollowedArtists"],
    queryFn: fetchUserFollowedArtists,
    select: (result) => result.data.artists.items,
  });
};
