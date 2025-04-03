export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends UserCredentials {
  username: string;
  // confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
