import { useMutation } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";

const revokeUnFollowPlaylist = (id: string) => {
  return api().delete(`/v1/playlists/${id}/followers`);
};

export const UseUnFollowPlaylistMutation = () => {
  return useMutation({
    mutationKey: ["unfollowPlaylist"],
    mutationFn: (id: string) => revokeUnFollowPlaylist(id),
  });
};
