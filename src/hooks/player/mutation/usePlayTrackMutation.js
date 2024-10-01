import { useMutation } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";

const fetchPlayTrack = ({ deviceId, trackId, positionMs }) => {
  if (!deviceId) throw new Error("device_id is required");
  return api().put(`v1/me/player/play?device_id=${deviceId}`, {
    uris: [
      trackId
        ? `spotify:track:${trackId}`
        : "spotify:track:1ybq1nfLfpyvga0hkNXFAu",
    ],
    // offset: {
    //   position: 5, // 특정 트랙 위치
    // },
    position_ms: positionMs ?? 0, // 트랙 시작 위치
  });
};

// 트랙 재생 훅
export const usePlayTrackMutation = () => {
  return useMutation({
    mutationFn: ({ deviceId, trackId, positionMs }) =>
      fetchPlayTrack({ deviceId, trackId, positionMs }),
  });
};
