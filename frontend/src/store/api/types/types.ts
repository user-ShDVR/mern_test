import { IType } from "types/IType";

export interface IAddTypesRequest {
  name: string;
  image_id: number;
  url: string;
}

export interface IGetTypesRequest {
  page: number;
  limit: number;
}

export interface IGetTypesResponse {
  types: IType[];
  totalCount: number;
}

export interface IGetCertainTypesRequest {
  id: string;
}

export interface IEditTypesRequest {
  id?: number;
  name?: string;
  image_id?: number;
  url?: string;
}

export interface IDeleteTypesRequest {
  id: number;
}
