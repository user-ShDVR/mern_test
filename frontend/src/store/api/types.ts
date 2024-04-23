export interface IUser {
  id?: number;
  name: string;
  surname: string;
  lastname: string;
  email: string;
  role: string;
}

export interface IUserState {
  user: IUser | null;
}
