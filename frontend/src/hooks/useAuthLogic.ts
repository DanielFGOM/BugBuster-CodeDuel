import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';
import { useAuth } from './useAuth';

export function useAuthLogic() {
  const [view, setView] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const executeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await authService.login(formData.username, formData.password);
      login(token);
      toast.success('¡Bienvenido, Agente!');
      setTimeout(() => navigate('/game'), 1000);
    } catch (error: any) {
      toast.error(error.response?.data || 'Error de autenticación');
    }
  };

  const executeRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register(formData.username, formData.email, formData.password);
      toast.success('Cuenta creada con éxito');
      setView('login');
    } catch (error: any) {
      toast.error(error.//response?.data || 'Error al registrar');
    }
  };

  return { view, setView, formData, handleInputChange, executeLogin, executeRegister };
}
