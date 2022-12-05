import { categoriesCollection } from "./clients/firebaseClient";
import type { ICategory } from "../types/ICategory";

export default {
  async getAll(): Promise<ICategory[]> {
    const categorySnapshots = await categoriesCollection.get();

    const categories: ICategory[] = [];

    categorySnapshots.forEach((document) => {
      const { name } = document.data();
      categories.push({
        docID: document.id,
        name,
      });
    });

    return categories;
  },
};
