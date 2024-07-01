import { IUser } from "types/IUser";

export interface IGetUsersResponse {
  users: IUser[];
  totalCount: number;
}

export interface IGetUsersRequest {
  page: number;
  limit: number;
}

export type TEditUsersResponse = IUser;

export interface IEditUsersRequest {
  id?: number;
  email?: string;
  hash?: string;
  salt?: string;
  surname?: string;
  name?: string;
  lastname?: string;
}
