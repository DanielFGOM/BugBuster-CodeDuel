import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './hooks/useAuth';
import AuthPage from './pages/AuthPage';
import Game from './pages/Game';
import Profile from './pages/Profile';

function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Login y Register ahora viven en la misma página AuthPage */}
      <Route path="/login" element={!token ? <AuthPage /> : <Navigate to="/game" />} />
      <Route path="/register" element={!token ? <AuthPage /> : <Navigate to="/game" />} />
      
      <Route path="/game" element={token ? <Game /> : <Navigate to="/login" />} />
      <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={token ? "/game" : "/login"} />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Notificaciones profesionales en la esquina superior derecha */}
        <Toaster position="top-right" reverseOrder={false} />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
