export interface IUser {
  id?: number;
  email: string;
  password: string;
  surname: string;
  name: string;
  lastname: string;
  role: string;
}

export interface IUserState {
  user: IUser | null;
}
