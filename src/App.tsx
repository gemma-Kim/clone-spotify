import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./common/Layout/AppLayout";
import { useDispatch } from "react-redux";
import { loadSpotifyPlayer } from "./utils/player/loadSpotifyPlayer";
import React, { useEffect } from "react";
import { PlayerProvider } from "src/contexts";
import HomePage from "@pages/HomePage/HomePage";
import SearchPage from "@pages/SearchPage/SearchPage";
import AuthRedirectPage from "@pages/AuthRedirectPage/AuthRedirectPage";
import UserPage from "@pages/UserPage/UserPage";
import AlbumPage from "@pages/AlbumPage/AlbumPage";
import ArtistPage from "@pages/ArtistPage/ArtistPage";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import PlaylistPage from "@pages/PlaylistPage/PlaylistPage";

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await loadSpotifyPlayer(dispatch);
    };
    fetchData();
  }, [dispatch]);

  return (
    <PlayerProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="auth-redirect" element={<AuthRedirectPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="albums">
            <Route path=":id" element={<AlbumPage />} />
          </Route>
          <Route path="artists">
            <Route path=":id" element={<ArtistPage />} />
          </Route>
          <Route path="playlists">
            <Route path=":id" element={<PlaylistPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PlayerProvider>
  );
};

export default App;
