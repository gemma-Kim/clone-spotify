import { useMutation } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";
import { Album, Track } from "@types";

export interface PlayTrackMutationParams {
  deviceId: string;
  tracks: Track[];
  positionMs?: number;
  position?: number;
}

const fetchPlayTrack = ({
  deviceId,
  tracks,
  positionMs,
}: PlayTrackMutationParams) => {
  return api().put(`v1/me/player/play?device_id=${deviceId}`, {
    uris: tracks.map((track) => `spotify:track:${track.id}`),
    // offset: {
    //   position: 5, // 특정 트랙 위치
    // },
    position_ms: positionMs ?? 0, // 트랙 시작 위치
  });
};

export const usePlayTrackMutation = () => {
  return useMutation({
    mutationFn: ({ deviceId, tracks, positionMs }: PlayTrackMutationParams) =>
      fetchPlayTrack({ deviceId, tracks, positionMs }),
  });
};
