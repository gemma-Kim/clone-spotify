import { useMutation } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";
import { PlayTrackMutationParams } from "./usePlayTrackMutation";

const fetchPlayAlbum = ({
  deviceId,
  tracks,
  positionMs = 0,
  position = 0,
}: PlayTrackMutationParams) => {
  return api().put(`v1/me/player/play?device_id=${deviceId}`, {
    uris: tracks.map((track) => `spotify:track:${track.id}`),
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
      tracks,
      positionMs,
      position,
    }: PlayTrackMutationParams) =>
      fetchPlayAlbum({ deviceId, tracks, positionMs, position }),
  });
};
