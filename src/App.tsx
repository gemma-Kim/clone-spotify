import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./common/Layout/AppLayout";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import SearchPage from "./pages/SearchPage/SearchPage";
import { loadSpotifyPlayer } from "./utils/player/loadSpotifyPlayer";
import AuthRedirectPage from "./pages/AuthRedirectPage/AuthRedirectPage";
import { TrackPlayerProvider } from "./common/Player/TrackPlayerProvider/TrackPlayerProvider";
import React, { useEffect } from "react";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import AlbumDetailPage from "./pages/AlbumDetailPage/AlbumDetailPage";

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await loadSpotifyPlayer(dispatch);
    };
    fetchData();
  }, [dispatch]);

  return (
    <TrackPlayerProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="auth-redirect" element={<AuthRedirectPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="albums">
            <Route path=":id" element={<AlbumDetailPage />} />
          </Route>
          <Route path="artists">
            <Route path=":id" element={<ArtistPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </TrackPlayerProvider>
  );
};

export default App;
