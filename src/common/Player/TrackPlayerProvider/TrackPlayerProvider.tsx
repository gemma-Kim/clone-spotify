import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePlayTrackMutation } from "../../../hooks/player/mutation/usePlayTrackMutation";
import { usePauseMutation } from "../../../hooks/player/mutation/usePauseMutation";
import { usePlayAlbumMutation } from "../../../hooks/player/mutation/usePlayAlbumMutation";
import { Album, Track } from "@types";
import { getPlayer } from "src/utils/player/loadSpotifyPlayer";

const noop = () => {};

interface TrackPlayerContextType {
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

const TrackPlayerContext = createContext<TrackPlayerContextType>({
  trackPlayerIsVisible: false,
  track: null,
  album: null,
  isPlaying: false,
  durationMs: 0,
  positionMs: 0,
  setTrackPlayerIsVisible: (val: boolean) => {},
  setTrack: (val: Track) => {},
  setAlbum: (val: Album) => {},
  setDurationMs: (val: number) => {},
  playTrack: noop,
  playNewTrack: (val: Track) => {},
  pauseTrack: noop,
  playAlbum: (val: any) => {},
  setPositionMs: (val: number) => {},
  setIsPlaying: (val: boolean) => {},
});

interface PlayAlbumParams {
  album: any;
  position?: number;
}

export const TrackPlayerProvider = ({ children }: any) => {
  const [trackPlayerIsVisible, setTrackPlayerIsVisible] = useState(false);
  const [track, setTrack] = useState<any>(null); // 현재 재생 중인 트랙
  const [tracks, setTracks] = useState<any[]>([]); // 현재 재생 중인 트랙
  const [album, setAlbum] = useState<any>(null); // 현재 재생 중인 앨범
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // 재생 상태
  const [positionMs, setPositionMs] = useState<number>(0); // 현재 재생 위치
  const [durationMs, setDurationMs] = useState<number>(0); // 현재 재생 트랙

  const deviceId = useSelector((state: any) => state.player.deviceId);

  const dispatch = useDispatch();
  const player = getPlayer(dispatch);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (durationMs > positionMs) {
      if (isPlaying && deviceId) {
        interval = setInterval(() => {
          setPositionMs((prevTime: number) => prevTime + 1000); // 1초마다 1초 증가
        }, 1000);
      } else {
        // 조건이 만족되지 않으면 바로 interval을 정리해줌
        clearInterval(interval);
      }
    } else {
      setIsPlaying(false);
      setPositionMs(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval); // 컴포넌트가 언마운트되거나 재생이 멈추면 clearInterval
  }, [track, isPlaying, deviceId, track?.duration_ms, positionMs]);

  player?.addListener("player_state_changed", (params: any) => {
    const currentTrack = params?.track_window?.current_track;
    const position = params?.position;
    const duration = params?.duration;
    const isPaused = params?.paused;

    if (currentTrack) {
      // track.id 비교로, 같은 트랙이면 setTrack 안 함
      if (!track) {
        console.log("여기로 온거죠??1 ");
        setTrack(currentTrack);
        setPositionMs(position);
        setDurationMs(duration);
      } else if (track.id !== currentTrack.id) {
        console.log("여기로 온거죠??2 ");
        setTrack(currentTrack);
        setPositionMs(position);
        setDurationMs(duration);
      }
    } else {
      console.log("여기로 온거죠??3 ");
    }

    // 이건 track 변화와 무관하게 항상 실행
    setIsPlaying(!isPaused);
  });

  const { mutate: playTrackM } = usePlayTrackMutation();
  const { mutate: playAlbumM } = usePlayAlbumMutation();
  const { mutate: pausePlayM } = usePauseMutation();

  // 재생 컨트롤
  const playTrack = async () => {
    if (deviceId && track) {
      playTrackM({ deviceId, positionMs, tracks: [track] });
    }
  };

  const playAlbum = ({ album, position = 0 }: PlayAlbumParams) => {
    if (deviceId && album) {
      const track = album?.tracks?.items[position];
      setAlbum(album);
      setPositionMs(position);
      setTrack(track);
      setDurationMs(track.duration_ms);
      setIsPlaying(true);
      playAlbumM({
        deviceId,
        positionMs,
        position,
        tracks: album.tracks.items,
      });
    }
  };

  // 새로운 트랙 재생 컨트롤
  const playNewTrack = (newTrack: Track) => {
    if (deviceId && newTrack) {
      playTrackM({ deviceId, positionMs: 0, tracks: [newTrack] });
    }
  };

  // 트랙 중지
  const pauseTrack = () => {
    if (deviceId) {
      pausePlayM(deviceId);
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
