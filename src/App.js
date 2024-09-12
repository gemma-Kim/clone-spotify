import "./App.css";
import { Route, Routes } from "react-router-dom"; // BrowserRouter 삭제
import AppLayout from "./layout/AppLayout";
import SearchPage from "./pages/SearchPage/SearchPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import AuthRedirectPage from "./pages/AuthRedirectPage/AuthRedirectPage";
import "bootstrap/dist/css/bootstrap.min.css";
import AlbumDetailPage from './pages/AlbumDetailPage/AlbumDetailPage';
import UserPage from './pages/UserPage/UserPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="auth-redirect" element={<AuthRedirectPage />} />
        <Route path="/user" element={<UserPage />} />
      </Route>
      <Route path='albums'>
            <Route path=':id' element={<AlbumDetailPage/>}/>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
