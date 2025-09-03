export interface SignUpData {
  email: string;
  name: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface User {
  userId: string;
  email: string;
  name: string;
}

export interface SignInResponse {
  message: string;
  token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface CurrentUserResponse {
  message: string;
  user: User;
}

export interface SignUpResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
