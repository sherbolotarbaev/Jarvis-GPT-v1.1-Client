export interface LoginDto {
  emailOrUsername: string;
  password: string;
}

export interface EmailVerificationDto {
  code: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}
