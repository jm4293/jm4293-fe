export interface IAuthSignInRes {
  email: string;
  name: string;
  refreshToken: string;
}

export interface IAuthSigUpRes {
  email: string;
  name: string;
  refreshToken: string;
}

export interface IAuthFindEmailRes {
  name: string;
  email: string;
}
