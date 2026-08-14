export type LoginType = "email" | "number";

export interface RegisterRequest {
  username: string;
  fullName: string;
  loginType: LoginType;
}

export interface VerifyOtpRequest {
  username: string;
  code: string;
}

export interface SetPasswordRequest {
  username: string;
  code: string;
  password: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface JwtPayload {
  sub?: number;
  fullName?: string;
  username?: string;
  exp?: number;
  iat?: number;
}