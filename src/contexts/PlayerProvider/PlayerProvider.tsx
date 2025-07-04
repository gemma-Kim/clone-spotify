import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Album, Artist, Playlist, Track } from "@types";
import { getPlayer } from "src/utils/player/loadSpotifyPlayer";
import { findTrackIndexInContent } from "src/utils/player/findTrackIndexInContent";
import {
  usePauseMutation,
  usePlayAlbumMutation,
  usePlayArtistMutation,
  usePlayPlaylistMutation,
  usePlayTrackMutation,
} from "@hooks/player";

const noop = () => {};

interface PlayerContextType {
  trackPlayerIsVisible: boolean;
  track: Track | null;
  album: Album | null;
  artist: Artist | null;
  playlist: Playlist | null;
  albumTrackPosition: number;
  playlistTrackPosition: number;
  durationMs: number;
  positionMs: number;
  isPlaying: boolean;
  playTrack: () => void;
  playTracks: (val: Track[]) => void;
  playNewTrack: (val: Track) => void;
  playNewTracks: (val: Track[]) => void;
  pauseTrack: () => void;
  playAlbum: (val: PlayAlbumParams) => void;
  playArtist: (val: PlayArtistParams) => void;
  playPlaylist: (val: PlayPlaylistParams) => void;
}

const PlayerContext = createContext<PlayerContextType>({
  trackPlayerIsVisible: false,
  track: null,
  album: null,
  artist: null,
  playlist: null,
  isPlaying: false,
  durationMs: 0,
  positionMs: 0,
  albumTrackPosition: 0,
  playlistTrackPosition: 0,
  playTrack: noop,
  playTracks: (val: Track[]) => {},
  playNewTrack: (val: Track) => {},
  playNewTracks: (val: Track[]) => {},
  pauseTrack: noop,
  playAlbum: (val: PlayAlbumParams) => {},
  playArtist: (val: PlayArtistParams) => {},
  playPlaylist: (val: PlayPlaylistParams) => {},
});

interface PlayAlbumParams {
  album: Album;
  position?: number;
  positionMs?: number;
}

interface PlayPlaylistParams {
  playlist: Playlist;
  position?: number;
  positionMs?: number;
}

interface PlayArtistParams {
  artist: Artist;
  positionMs?: number;
}

export const PlayerProvider = ({ children }: any) => {
  const [trackPlayerIsVisible, setTrackPlayerIsVisible] = useState(false);
  const [track, setTrack] = useState<any>(null); // 현재 재생 중인 트랙
  const [album, setAlbum] = useState<any>(null); // 현재 재생 중인 앨범
  const [artist, setArtist] = useState<any>(null); // 현재 재생 중인 아티스트
  const [playlist, setPlaylist] = useState<any>(null); // 현재 재생 중인 플레이리스트
  const [albumTrackPosition, setAlbumTrackPosition] = useState<number>(0); // 현재 재생 중인 앨범
  const [playlistTrackPosition, setPlaylistTrackPosition] = useState<number>(0); // 현재 재생 중인 앨범
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
  }, [track, isPlaying, deviceId, track?.duration_ms]);

  player?.addListener(
    "player_state_changed",
    (params: Spotify.PlaybackState) => {
      const currentTrack = params?.track_window?.current_track;
      const position = params?.position;
      const duration = params?.duration;
      const isPaused = params?.paused;

      if (currentTrack) {
        // track.id 비교로, 같은 트랙이면 setTrack 안 함
        if (!track) {
          setTrack(currentTrack);
          setPositionMs(position);
          setDurationMs(duration);
        } else if (track.id !== currentTrack.id) {
          setTrack(currentTrack);
          setPositionMs(position);
          setDurationMs(duration);
        }

        if (album?.tracks?.items?.length) {
          const index = findTrackIndexInContent(
            album,
            currentTrack.id as string
          );
          if (index !== albumTrackPosition) {
            setAlbumTrackPosition(index);
          }
        }

        if (playlist?.tracks?.items?.length) {
          const index = findTrackIndexInContent(
            playlist,
            currentTrack.id as string
          );
          if (index !== playlistTrackPosition) {
            setPlaylistTrackPosition(index);
          }
        }
      } else {
        setTrack(null);
      }

      setIsPlaying(!isPaused);
      setTrackPlayerIsVisible(!!currentTrack);
    }
  );

  const { mutate: playTrackM } = usePlayTrackMutation();
  const { mutate: playAlbumM } = usePlayAlbumMutation();
  const { mutate: pausePlayM } = usePauseMutation();
  const { mutate: playPlaylistM } = usePlayPlaylistMutation();
  const { mutate: playArtistM } = usePlayArtistMutation();

  const initializeContent = () => {
    if (album) setAlbum(null);
    if (artist) setArtist(null);
    if (playlist) setPlaylist(null);
  };

  // 재생 컨트롤
  const playTrack = async () => {
    if (deviceId && track) {
      playTrackM({ deviceId, positionMs, tracks: [track] });
    }
  };

  const playTracks = async (tracks: Track[]) => {
    if (deviceId && tracks.length) {
      playTrackM({ deviceId, positionMs, tracks });
    }
  };

  const playAlbum = ({ album, positionMs, position = 0 }: PlayAlbumParams) => {
    if (deviceId) {
      initializeContent();
      playAlbumM({
        album,
        deviceId,
        positionMs,
        position,
      });
      setAlbum(album);
    }
  };

  const playArtist = ({ artist, positionMs }: PlayArtistParams) => {
    if (deviceId) {
      initializeContent();
      playArtistM({
        artist,
        deviceId,
        positionMs,
      });
      setArtist(artist);
    }
  };

  const playPlaylist = ({
    playlist,
    positionMs,
    position = 0,
  }: PlayPlaylistParams) => {
    if (deviceId) {
      initializeContent();
      playPlaylistM({
        playlist,
        deviceId,
        positionMs,
        position,
      });
      setPlaylist(playlist);
    }
  };

  // 새로운 트랙 재생 컨트롤
  const playNewTrack = (newTrack: Track) => {
    if (deviceId && newTrack) {
      playTrackM({ deviceId, positionMs: 0, tracks: [newTrack] });
    }
  };

  const playNewTracks = (newTracks: Track[]) => {
    if (deviceId && newTracks.length) {
      playTrackM({ deviceId, positionMs: 0, tracks: newTracks });
    }
  };

  // 트랙 중지
  const pauseTrack = () => {
    if (deviceId) {
      pausePlayM(deviceId);
    }
  };

  return (
    <PlayerContext.Provider
      value={
        // TrackPlayerContext
        {
          trackPlayerIsVisible,
          isPlaying,
          track,
          album,
          artist,
          playlist,
          durationMs,
          positionMs,
          albumTrackPosition,
          playlistTrackPosition,
          playTrack,
          playTracks,
          playNewTrack,
          playNewTracks,
          pauseTrack,
          playAlbum,
          playArtist,
          playPlaylist,
        }
      }
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
