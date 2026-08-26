export interface User {
  id: number;
  username: string;
  email: string;
  points: number;
  currentLevel: number;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  template: string;
  expectedOutput: string;
  hint: string;
}

export interface Submission {
  id: number;
  code: string;
  passed: boolean;
  output: string;
  submittedAt: string;
}