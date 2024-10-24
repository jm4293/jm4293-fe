export interface IAuthSignInReq {
  email: string;
  password: string;
}

export interface IAuthSignUp {
  email: string;
  password: string;
  name: string;
}

export interface IAuthChangePassword {
  email: string;
  password: string;
}

export interface IAuthFindPassword {
  email: string;
}

export interface IAuthResponse {
  email: string;
  name: string;
}
