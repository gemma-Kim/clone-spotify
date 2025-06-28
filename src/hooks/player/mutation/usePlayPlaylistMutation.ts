import { useMutation } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";
import { Album, Playlist } from "@types";

export interface PlayPlaylistMutationParams {
  deviceId: string;
  playlist: Playlist;
  positionMs?: number;
  position?: number;
}

const revokePlayPlaylist = ({
  deviceId,
  playlist,
  positionMs = 0,
  position = 0,
}: PlayPlaylistMutationParams) => {
  return api().put(`v1/me/player/play?device_id=${deviceId}`, {
    context_uri: `spotify:playlist:${playlist.id}`,
    offset: {
      position,
    },
    position_ms: positionMs,
  });
};

export const usePlayPlaylistMutation = () => {
  return useMutation({
    mutationFn: ({
      deviceId,
      playlist,
      positionMs,
      position,
    }: PlayPlaylistMutationParams) =>
      revokePlayPlaylist({ deviceId, playlist, positionMs, position }),
  });
};
