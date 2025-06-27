import { useMutation } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";

const revokeFollowPlaylist = (id: string) => {
  return api().put(`/v1/playlists/${id}/followers`, null, {
    // params: {
    //   type: "artist",
    //   ids: Array.isArray(ids) ? ids.join(",") : ids,
    // },
  });
};

export const UseFollowPlaylistMutation = () => {
  return useMutation({
    mutationKey: ["followPlaylist"],
    mutationFn: (id: string) => revokeFollowPlaylist(id),
  });
};
