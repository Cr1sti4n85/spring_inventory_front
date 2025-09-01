//AUTH TYPES

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role?: string;
}

export interface LoginData {
  email: string;
  password: string;
}
