import { apiClient } from "./axios";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  SetPasswordRequest,
  VerifyOtpRequest,
} from "../types/auth.types";

export async function loginUser(data: LoginRequest) {
  const { data: response } = await apiClient.post<LoginResponse>("/auth/login", data);
  return response;
}

export async function registerUser(data: RegisterRequest) {
  await apiClient.post("/auth/register", data);
}

export async function verifyOtp(data: VerifyOtpRequest) {
  await apiClient.post("/auth/verify", data);
}

export async function setPassword(data: SetPasswordRequest) {
  await apiClient.post("/auth/set-password", data);
}