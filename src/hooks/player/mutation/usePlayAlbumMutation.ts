import { useMutation } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";
import { Album } from "@types";

export interface PlayAlbumMutationParams {
  deviceId: string;
  album: Album;
  positionMs?: number;
  position?: number;
}

const fetchPlayAlbum = ({
  deviceId,
  album,
  positionMs = 0,
  position = 0,
}: PlayAlbumMutationParams) => {
  return api().put(`v1/me/player/play?device_id=${deviceId}`, {
    context_uri: `spotify:album:${album.id}`,
    offset: {
      position,
    },
    position_ms: positionMs,
  });
};

export const usePlayAlbumMutation = () => {
  return useMutation({
    mutationFn: ({
      deviceId,

      album,
      positionMs,
      position,
    }: PlayAlbumMutationParams) =>
      fetchPlayAlbum({ deviceId, album, positionMs, position }),
  });
};
