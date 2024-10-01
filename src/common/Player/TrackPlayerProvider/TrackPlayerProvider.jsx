import React, { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { usePlayTrackMutation } from "../../../hooks/player/mutation/usePlayTrackMutation";
import { usePauseMutation } from "../../../hooks/player/mutation/usePauseMutation";

const TrackPlayerContext = createContext();

export const TrackPlayerProvider = ({ children }) => {
  const [trackPlayerIsVisible, setTrackPlayerIsVisible] = useState(false);
  const [track, setTrack] = useState(null); // 현재 재생 중인 트랙
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태
  const [positionMs, setPositionMs] = useState(0); // 현재 재생 위치

  const deviceId = useSelector((state) => state.player.deviceId);

  const { mutate: playTrackM } = usePlayTrackMutation();
  const { mutate: pausePlayM } = usePauseMutation();

  // 재생 컨트롤
  const playTrack = () => {
    if (deviceId && track) {
      playTrackM({ deviceId, positionMs, trackId: track.id });
      setIsPlaying(true);
    }
  };

  // 새로운 트랙 재생 컨트롤
  const playNewTrack = (newTrack) => {
    if (deviceId && newTrack) {
      setPositionMs(0);
      setTrack(newTrack);
      playTrackM({ deviceId, positionMs: 0, trackId: newTrack.id });
      setIsPlaying(true);
    }
  };

  // 트랙 중지
  const pauseTrack = () => {
    if (deviceId) {
      pausePlayM({ deviceId });
      setIsPlaying(false);
    }
  };

  return (
    <TrackPlayerContext.Provider
      value={{
        trackPlayerIsVisible,
        setTrackPlayerIsVisible,
        track,
        setTrack,
        isPlaying,
        playTrack,
        playNewTrack,
        pauseTrack,
        positionMs,
        setPositionMs,
        setIsPlaying,
      }}
    >
      {children}
    </TrackPlayerContext.Provider>
  );
};

export const useTrackPlayer = () => useContext(TrackPlayerContext);
