export interface LoginResponseDto {
  status: boolean;
  message: string;
  data: {
    token: string;
    role: string;
  };
}
