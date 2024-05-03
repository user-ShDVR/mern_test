export interface IUserResponse {
  id?: number;
  email: string;
  password: string;
  surname: string;
  name: string;
  lastname: string;
  role: string;
}

export type ISignUpFields = {
  id?: number;
  email: string;
  password: string;
  surname: string;
  name: string;
  lastname: string;
  role: string;
};

export type ISignInFields = {
  id?: number;
  email: string;
  password: string;
  surname: string;
  name: string;
  lastname: string;
  role: string;
};
