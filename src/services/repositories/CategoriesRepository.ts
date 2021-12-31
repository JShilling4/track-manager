import { categoriesCollection } from "@/includes/firebase";
import { CategoryDto } from "@/types";
import { ICategoriesRepository } from "@/types";
import { injectable } from "inversify-props";

@injectable()
export class CategoriesRepository implements ICategoriesRepository {
  public async getAll(): Promise<CategoryDto[]> {
    const categorySnapshots = await categoriesCollection.get();

    const categories: CategoryDto[] = [];

    categorySnapshots.forEach((document) => {
      const { name } = document.data();
      categories.push({
        docID: document.id,
        name
      });
    });

    return categories;
  }

  // public async delete(track: TrackDto): Promise<void> {}
}
