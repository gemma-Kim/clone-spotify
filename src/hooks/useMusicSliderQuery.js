import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api/api";

const fetchMusicSlider = () => {
  return api().get(`v1/browse/new-releases`);
};

export const useMusicSliderQuery = () => {
  return useQuery({
    queryKey: ["music-slider"],
    queryFn: () => fetchMusicSlider(),
    select: (res) => res.data.albums.items,
  });
};
