import { useMutation } from "@tanstack/react-query";
import { api } from "../../utils/api/api";

// 트랙 재생 API 호출 함수
const fetchSeekToPosition = ({ deviceId, trackId, positionMs }) => {
  if (!deviceId) throw new Error("device_id is required");
  return api().put(`v1/me/player/play?device_id=${deviceId}`, {
    // context_uri: "spotify:track:1ybq1nfLfpyvga0hkNXFAu", //"1ybq1nfLfpyvga0hkNXFAu", //"spotify:album:6QW5oofVFc5T7zAdCJEHd0", // 앨범 URI
    uris: [trackId ?? "spotify:track:1ybq1nfLfpyvga0hkNXFAu"],
    // offset: {
    //   position: 5, // 특정 트랙 위치
    // },
    position_ms: positionMs ?? 0, // 트랙 시작 위치
  });
};

// 트랙 재생 훅
export const useSeektoPositionMutation = () => {
  return useMutation({
    mutationFn: ({ deviceId, trackId, positionMs }) =>
      fetchSeekToPosition({ deviceId, trackId, positionMs }),
  });
};
