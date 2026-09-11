import api from '../api/axios';

export interface Level {
  id: number;
  title: string;
  description: string;
  template: string;
  expectedOutput: string;
  hint: string;
}

export interface SubmitResult {
  success: boolean;
  message: string;
  output?: string;
}

export const gameService = {
  async fetchLevels(): Promise<Level[]> {
    const res = await api.get('/game/levels');
    return res.data;
  },
  async submitSolution(levelId: number, code: string): Promise<SubmitResult> {
    const res = await api.post('/game/submit', { levelId, code });
    return res.data;
  }
};
