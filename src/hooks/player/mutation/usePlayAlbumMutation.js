import { useMutation } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";

const fetchPlayAlbum = ({ deviceId, tracks, positionMs }) => {
  return api().put(`v1/me/player/play?device_id=${deviceId}`, {
    uris: tracks.map((track) => `spotify:track:${track.id}`),
    offset: {
      position: 0,
    },
    position_ms: positionMs ?? 0,
  });
};

export const usePlayAlbumMutation = () => {
  return useMutation({
    mutationFn: ({ deviceId, tracks, positionMs }) =>
      fetchPlayAlbum({ deviceId, tracks, positionMs }),
  });
};
