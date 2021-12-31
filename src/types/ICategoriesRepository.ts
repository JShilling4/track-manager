import { CategoryDto } from "@/types";

export interface ICategoriesRepository {
  getAll(): Promise<CategoryDto[]>;
}
