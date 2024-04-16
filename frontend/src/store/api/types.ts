export interface IUser {
  email: string;
  name: string;
  gender: string;
  birth_date: Date;
  avatarUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserState {
  user: IUser | null;
  token: string | null;
}

export interface IUserFields {
  token: string | null;
  email: string;
  name: string;
  gender: string;
  birth_date: Date;
  avatarUrl: string;
}
