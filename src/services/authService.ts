import { User, UserRole } from '../types';

interface Credentials {
  username: string;
  password: string;
  role: UserRole;
}

const USERS: Credentials[] = [
  { username: 'admin', password: '123', role: 'admin' },
  { username: 'user', password: '123', role: 'user' },
];

export const AuthService = {
  authenticate(username: string, password: string): User | null {
    const found = USERS.find(
      u => u.username === username && u.password === password,
    );
    if (!found) {
      return null;
    }
    return { username: found.username, role: found.role };
  },
};
