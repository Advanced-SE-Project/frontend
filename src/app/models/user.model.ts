export interface User {
    id?: number;
    username: string;
    password: string;
    confirmPassword?: string; // Optional for registration
    token?: string; // JWT token after login
  }  