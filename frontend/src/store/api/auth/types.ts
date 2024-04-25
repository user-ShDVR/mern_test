export interface IUserResponse {
  id?: number;
  email: string;
  password: string
  surname: string;
  name: string;
  lastname: string;
  role: string;
}

export type ISignUpFields = {
  email: string;
  password: string;
  surname: string;
  name: string;
  lastname: string;
  role: string;
};

export type ISignInFields = {
  email: string;
  password: string;
  surname: string;
  name: string;
  lastname: string;
  role: string;
};
