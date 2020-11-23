/* eslint-disable @typescript-eslint/ban-types */
interface IAuthenticationData {
  token: string;
  user: object;
}

interface ISignInCredentials {
  email: string;
  password: string;
}
interface IAuthenticationContextData {
  user: object;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

export type {
  IAuthenticationData,
  ISignInCredentials,
  IAuthenticationContextData,
};
