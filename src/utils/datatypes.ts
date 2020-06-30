// This is the interface for Login request
export interface LoginRequest {
  id_token: string;
}

// This is interface for login response
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  left_days: string;
}

// This is the interface for Refresh request
export interface RefreshRequest {
  refresh_token: string;
}

// This is interface for refresh response
export interface RefreshResponse {
  access_token: string;
  left_days: string;
}
