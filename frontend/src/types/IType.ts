import { IImage } from "./Image";

export interface IType {
  id: number;
  name: string;
  url: string;
  image_id: number;
  image: IImage;
}
