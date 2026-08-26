import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Game from './pages/Game';
import Profile from './pages/Profile';
import { useAuth } from './hooks/useAuth';

function App() {
  const { token } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/game" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/game" />} />
        <Route path="/game" element={token ? <Game /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/game" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;