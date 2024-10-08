import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import SearchPage from "./pages/SearchPage/SearchPage";
import { loadSpotifyPlayer } from "./utils/player/loadSpotifyPlayer";
import AuthRedirectPage from "./pages/AuthRedirectPage/AuthRedirectPage";
import { TrackPlayerProvider } from "./common/Player/TrackPlayerProvider/TrackPlayerProvider";
import React, { useEffect } from "react";
import AlbumDetailPage from "./pages/AlbumDetailPage/AlbumDetailPage";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";

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
          <Route path="/user" element={<UserPage />} />
          <Route path="albums">
            <Route path=":id" element={<AlbumDetailPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </TrackPlayerProvider>
  );
};

export default App;
