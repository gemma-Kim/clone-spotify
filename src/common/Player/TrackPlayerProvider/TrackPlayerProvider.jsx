import React, { createContext, useContext, useEffect, useState } from "react";

const TrackPlayerContext = createContext();

export const TrackPlayerProvider = ({ children }) => {
  const [trackPlayerIsVisible, setTrackPlayerIsVisible] = useState(false);
  const [track, setTrack] = useState(null);

  return (
    <TrackPlayerContext.Provider
      value={{ trackPlayerIsVisible, setTrackPlayerIsVisible, track, setTrack }}
    >
      {children}
    </TrackPlayerContext.Provider>
  );
};

export const useTrackPlayer = () => useContext(TrackPlayerContext);
