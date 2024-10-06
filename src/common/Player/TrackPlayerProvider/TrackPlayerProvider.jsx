import React, { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { usePlayTrackMutation } from "../../../hooks/player/mutation/usePlayTrackMutation";
import { usePauseMutation } from "../../../hooks/player/mutation/usePauseMutation";
import { usePlayAlbumMutation } from "../../../hooks/player/mutation/usePlayAlbumMutation";

const TrackPlayerContext = createContext();

export const TrackPlayerProvider = ({ children }) => {
  const [trackPlayerIsVisible, setTrackPlayerIsVisible] = useState(false);
  const [track, setTrack] = useState(null); // 현재 재생 중인 트랙
  const [tracks, setTracks] = useState([]); // 현재 재생 중인 트랙
  const [album, setAlbum] = useState(null); // 현재 재생 중인 앨범
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태
  const [positionMs, setPositionMs] = useState(0); // 현재 재생 위치
  const [durationMs, setDurationMs] = useState(0); // 현재 재생 트랙

  const deviceId = useSelector((state) => state.player.deviceId);

  const { mutate: playTrackM } = usePlayTrackMutation();
  const { mutate: playAlbumM } = usePlayAlbumMutation();
  const { mutate: pausePlayM } = usePauseMutation();

  // 재생 컨트롤
  const playTrack = () => {
    if (deviceId && track) {
      playTrackM({ deviceId, positionMs, trackId: track.id });
      setIsPlaying(true);
    }
  };

  const playAlbum = ({ albumData, position = 0 }) => {
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
  const playNewTrack = (newTrack) => {
    if (deviceId && newTrack) {
      setPositionMs(0);
      setTrack(newTrack);
      setDurationMs(track.duration_ms);
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
        album,
        setTrack,
        setAlbum,
        durationMs,
        setDurationMs,
        isPlaying,
        playTrack,
        playNewTrack,
        pauseTrack,
        playAlbum,
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
