import api from '../api/axios';

export const authService = {
  async login(username: string, password: string) {
    const res = await api.post('/auth/login', { username, password });
    return res.data; // Retorna el Token
  },
  async register(username: string, email: string, password: string) {
    const res = await api.post('/auth/register', { username, email, password });
    return res.data;
  }
};
