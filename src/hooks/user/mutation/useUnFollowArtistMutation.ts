import { useMutation } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";

const revokeUnFollowArtist = (ids: string | string[]) => {
  return api().delete(`v1/me/following`, {
    params: {
      type: "artist",
      ids: Array.isArray(ids) ? ids.join(",") : ids,
    },
  });
};

export const UseUnFollowArtistMutation = () => {
  return useMutation({
    mutationKey: ["unfollowArtist"],
    mutationFn: (ids: string | string[]) => revokeUnFollowArtist(ids),
  });
};
