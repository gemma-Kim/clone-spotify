import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/api/api";

const fetchSearchTrack = ({ trackId }) => {
  if (!trackId) throw new Error("device_id is required");
  return api().get(`v1/tracks/${trackId}`);
};

export const useGetTrackQuery = (trackId) => {
  return useQuery({
    queryKey: ["search-track", trackId],
    queryFn: () => fetchSearchTrack({ trackId }),
    select: (res) => res.data,
  });
};
