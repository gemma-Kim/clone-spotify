import React, { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { usePlayTrackMutation } from "../../../hooks/player/mutation/usePlayTrackMutation";
import { usePauseMutation } from "../../../hooks/player/mutation/usePauseMutation";
import { usePlayAlbumMutation } from "../../../hooks/player/mutation/usePlayAlbumMutation";
import { Track } from "@types";
interface CurrentUserContextType {
  trackPlayerIsVisible: boolean;
  setTrackPlayerIsVisible: any;
  track: Track | null;
  album: any | null;
  setTrack: any;
  setAlbum: any;
  durationMs: number;
  setDurationMs: any;
  isPlaying: boolean;
  playTrack: any;
  playNewTrack: any;
  pauseTrack: any;
  playAlbum: any;
  positionMs: number;
  setPositionMs: any;
  setIsPlaying: any;
}

const TrackPlayerContext = createContext<CurrentUserContextType>({
  trackPlayerIsVisible: false,
  track: null,
  album: null,
  isPlaying: false,
  durationMs: 0,
  positionMs: 0,
  setTrackPlayerIsVisible: (val: boolean) => {},
  setTrack: (val: Track) => {},
  setAlbum: (val: any) => {},
  setDurationMs: (val: number) => {},
  playTrack: (val: any) => {},
  playNewTrack: (val: any) => {},
  pauseTrack: (val: any) => {},
  playAlbum: (val: any) => {},
  setPositionMs: (val: number) => {},
  setIsPlaying: (val: boolean) => {},
});

export const TrackPlayerProvider = ({ children }: any) => {
  const [trackPlayerIsVisible, setTrackPlayerIsVisible] = useState(false);
  const [track, setTrack] = useState<any>(null); // 현재 재생 중인 트랙
  const [tracks, setTracks] = useState<any[]>([]); // 현재 재생 중인 트랙
  const [album, setAlbum] = useState<any>(null); // 현재 재생 중인 앨범
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // 재생 상태
  const [positionMs, setPositionMs] = useState<number>(0); // 현재 재생 위치
  const [durationMs, setDurationMs] = useState<number>(0); // 현재 재생 트랙

  const deviceId = useSelector((state: any) => state.player.deviceId);

  const { mutate: playTrackM } = usePlayTrackMutation();
  const { mutate: playAlbumM } = usePlayAlbumMutation();
  const { mutate: pausePlayM } = usePauseMutation();

  // 재생 컨트롤
  const playTrack = () => {
    if (deviceId && track) {
      playTrackM({ deviceId, positionMs, tracks: [track] });
      setIsPlaying(true);
    }
  };

  const playAlbum = ({ albumData, position = 0 }: any) => {
    if (deviceId && albumData) {
      const track = albumData?.tracks?.items[position];
      setAlbum(albumData);
      setPositionMs(position);
      setTrack(track);
      setDurationMs(track.duration_ms);
      setIsPlaying(true);
      playAlbumM({
        deviceId,
        positionMs,
        position,
        tracks: albumData.tracks.items,
      });
    }
  };

  // 새로운 트랙 재생 컨트롤
  const playNewTrack = (newTrack: Track) => {
    if (deviceId && newTrack) {
      setPositionMs(0);
      setTrack(newTrack);
      setDurationMs(track?.duration_ms as number);
      playTrackM({ deviceId, positionMs: 0, tracks: [newTrack] });
      setIsPlaying(true);
    }
  };

  // 트랙 중지
  const pauseTrack = () => {
    if (deviceId) {
      pausePlayM(deviceId);
      setIsPlaying(false);
    }
  };

  return (
    <TrackPlayerContext.Provider
      value={
        // TrackPlayerContext
        {
          trackPlayerIsVisible,
          isPlaying,
          track,
          album,
          durationMs,
          positionMs,
          setTrackPlayerIsVisible,
          setTrack,
          setAlbum,
          setDurationMs,
          playTrack,
          playNewTrack,
          pauseTrack,
          playAlbum,
          setPositionMs,
          setIsPlaying,
        }
      }
    >
      {children}
    </TrackPlayerContext.Provider>
  );
};

export const useTrackPlayer = () => useContext(TrackPlayerContext);
