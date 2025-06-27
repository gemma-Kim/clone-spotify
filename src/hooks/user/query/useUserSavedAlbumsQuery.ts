import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";

const fetchUserSavedAlbums = () => {
  return api().get(`v1/me/albums?offset=0&limit=20`);
};

export const useUserSavedAlbumsQuery = () => {
  return useQuery({
    queryKey: ["userSavedAlbums"],
    queryFn: fetchUserSavedAlbums,
    select: (result) => result.data.items,
  });
};
