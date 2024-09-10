import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';//BrowserRouter as Router 추가
import AppLayout from './layout/AppLayout';
import SearchPage from './pages/SearchPage/SearchPage';//SearchPage추가
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Homepage from './pages/HomePage/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="search" element={<SearchPage />} /> {/* SearchPage */}
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
