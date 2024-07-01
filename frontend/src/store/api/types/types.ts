import { IType } from "types/IType";

export type TAddTypesResponse = IType;
export interface IAddTypesRequest {
  name: string;
  image_id: number;
  url: string;
}

export interface IGetTypesResponse {
  types: IType[];
  totalCount: number;
}

export interface IGetTypesRequest {
  page: number;
  limit: number;
}

export type TGetCertainTypesResponse = IType[];
export interface IGetCertainTypesRequest {
  id: string;
}

export type TEditTypesResponse = IType;
export interface IEditTypesRequest {
  id?: number;
  name?: string;
  image_id?: number;
  url?: string;
}

export type TDeleteTypesResponse = void;
export interface IDeleteTypesRequest {
  id: number;
}
