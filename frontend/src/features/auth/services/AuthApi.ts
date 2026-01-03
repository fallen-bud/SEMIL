import API from "../../../services/Api";

/* ======================
   Interfaces
====================== */

/**
 * Register payload
 * (frontend → backend)
 */
export interface RegisterPayload {
  Username: string;
  Name: string;
  Number: string;
  Address: string;
  Password: string;
}

/**
 * Login payload
 * (depends on backend login logic)
 */
export interface LoginPayload {
  Username: string; // ya Number, jo backend allow kare
  Password: string;
}

/**
 * User data returned from backend
 * (NEVER include password / refreshToken)
 */
export interface User {
  _id: string;
  Username: string;
  Name: string;
  Number: string;
  Address: string;
  createdAt: string;
}

/**
 * Auth response
 * (backend → frontend)
 */
export interface AuthResponse {
  user: User;
  token: string;
}

/* ======================
   Auth API
====================== */

const AuthApi = {
  // POST /api/auth/register
  register: async (
    userdata: RegisterPayload
  ): Promise<AuthResponse> => {
    const response = await API.post<AuthResponse>(
      "/api/auth/register",
      userdata
    );
    return response.data;
  },

  // POST /api/auth/login
  login: async (
    credential: LoginPayload
  ): Promise<AuthResponse> => {
    const response = await API.post<AuthResponse>(
      "/api/auth/login",
      credential
    );
    return response.data;
  },
};

export default AuthApi;
