import { useMutation } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";

const revokeFollowArtist = (ids: string | string[]) => {
  return api().put(`v1/me/following`, null, {
    params: {
      type: "artist",
      ids: Array.isArray(ids) ? ids.join(",") : ids,
    },
  });
};

export const UsefollowArtistMutation = () => {
  return useMutation({
    mutationKey: ["followArtist"],
    mutationFn: (ids: string | string[]) => revokeFollowArtist(ids),
  });
};
