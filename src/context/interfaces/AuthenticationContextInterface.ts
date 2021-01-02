/* eslint-disable @typescript-eslint/ban-types */
interface IAuthenticationData {
  token: string;
  user: User;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

interface ISignInCredentials {
  email: string;
  password: string;
}
interface IAuthenticationContextData {
  user: User;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

export type {
  IAuthenticationData,
  ISignInCredentials,
  IAuthenticationContextData,
};
