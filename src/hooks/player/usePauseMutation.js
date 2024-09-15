import { useMutation } from "@tanstack/react-query";
import { api } from "../../utils/api/api";

const fetchPausePlaying = ({ deviceId }) => {
  if (!deviceId) {
    throw new Error("device_id is required to pause playing");
  }
  return api().put(`v1/me/player/pause?device_id=${deviceId}`);
};

export const usePauseMutation = () => {
  return useMutation({
    mutationFn: ({ deviceId }) => fetchPausePlaying({ deviceId }),
  });
};
