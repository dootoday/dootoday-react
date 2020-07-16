// This is the interface for Login request
export interface LoginRequest {
  id_token: string;
}

// This is interface for login response
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

// This is the interface for Refresh request
export interface RefreshRequest {
  refresh_token: string;
}

// This is interface for refresh response
export interface RefreshResponse {
  access_token: string;
}

// This is the interface for user response
export interface UserResponse {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  left_days: number;
}

// This is the interface for the task repsonse
export interface TaskResponse {
  id: number;
  markdown: string;
  is_done: boolean;
  column_id: string;
  date: string;
  order: number;
}

// This is the column response
export interface ColumnResponse {
  id: string;
  name: string;
  meta: string;
  tasks: TaskResponse[];
}

export interface OrderResponse {
  key_id: string;
  order_id: string;
  name: string;
  description: string;
  image: string;
  user_full_name: string;
  user_email: string;
  user_phone: string;
  callback_url: string;
  cancel_url: string;
  amount: number;
}

export interface PlanResponse {
  plan_id: number;
  name: string;
  description: string;
  amount: number;
  offer_amount: number;
}
