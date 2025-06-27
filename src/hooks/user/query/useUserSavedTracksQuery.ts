import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";

const fetchUserSavedTracks = () => {
  return api().get(`v1/me/tracks`);
};

export const useUserSavedTracksQuery = () => {
  return useQuery({
    queryKey: ["userSavedTracks"],
    queryFn: fetchUserSavedTracks,
    select: (result) => result.data.items,
  });
};
