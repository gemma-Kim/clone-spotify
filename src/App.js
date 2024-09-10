import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Homepage from './pages/Homepage/HomePage';
import UserPage from './pages/UserPage/UserPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/user" element={<UserPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
