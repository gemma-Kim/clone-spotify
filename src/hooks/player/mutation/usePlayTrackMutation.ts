import { useMutation } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";
import { Track } from "@types";

export interface PlayTrackMutationParams {
  deviceId: string;
  tracks: Track[];
  positionMs?: number;
}

const fetchPlayTrack = ({
  deviceId,
  tracks,
  positionMs = 0,
}: PlayTrackMutationParams) => {
  return api().put(`v1/me/player/play?device_id=${deviceId}`, {
    uris: tracks.map((track) => `spotify:track:${track.id}`),
    position_ms: positionMs, // 트랙 시작 위치
  });
};

export const usePlayTrackMutation = () => {
  return useMutation({
    mutationFn: ({ deviceId, tracks, positionMs }: PlayTrackMutationParams) =>
      fetchPlayTrack({ deviceId, tracks, positionMs }),
  });
};
