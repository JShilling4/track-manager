import { ICategory } from "./ICategory";

export interface ICategoriesRepository {
  getAll(): Promise<ICategory[]>;
}
