import "./App.css";
import { Route, Routes } from "react-router-dom"; // BrowserRouter 삭제
import AppLayout from "./layout/AppLayout";
import SearchPage from "./pages/SearchPage/SearchPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import AuthRedirectPage from "./pages/AuthRedirectPage/AuthRedirectPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadSpotifyPlayer } from "./utils/player/loadSpotifyPlayer";
import { TrackPlayerProvider } from "./common/Player/TrackPlayerProvider/TrackPlayerProvider";
import AlbumDetailPage from "./pages/AlbumDetailPage/AlbumDetailPage";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  return (
    <TrackPlayerProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />

          <Route path="/album/:id" element={<AlbumDetailPage />} />  {/* 검색페이지에서 앨범상세페이지 이동문제로 수정 */}

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
}

export default App;
