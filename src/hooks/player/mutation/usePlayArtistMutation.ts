import { useMutation } from "@tanstack/react-query";
import { api } from "../../../utils/api/api";
import { Artist } from "@types";

export interface PlayArtistMutationParams {
  deviceId: string;
  artist: Artist;
  positionMs?: number;
}

const revokePlayArtist = ({
  deviceId,
  artist,
  positionMs = 0,
}: PlayArtistMutationParams) => {
  return api().put(`v1/me/player/play?device_id=${deviceId}`, {
    context_uri: artist.uri,
    position_ms: positionMs,
  });
};

export const usePlayArtistMutation = () => {
  return useMutation({
    mutationFn: ({ deviceId, artist, positionMs }: PlayArtistMutationParams) =>
      revokePlayArtist({ deviceId, artist, positionMs }),
  });
};
