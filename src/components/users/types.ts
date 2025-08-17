export type UserRole = 'admin' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  position?: string;
  // avatarUrl?: string; // оставил на будущее
}
