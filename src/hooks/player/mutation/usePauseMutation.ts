import { useMutation } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";

const fetchPausePlaying = (deviceId: string) => {
  return api().put(`v1/me/player/pause?device_id=${deviceId}`);
};

export const usePauseMutation = () => {
  return useMutation({
    mutationFn: (deviceId: string) => fetchPausePlaying(deviceId),
  });
};
