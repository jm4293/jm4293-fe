export interface IAuthSignInRes {
  email: string;
  name: string;
  refreshToken: string;
}

export interface IAuthSigUpRes {
  email: string;
  name: string;
}

export interface IAuthChangePasswordRes {
  email: string;
  name: string;
}

export interface IAuthFindEmailRes {
  name: string;
  email: string;
}
