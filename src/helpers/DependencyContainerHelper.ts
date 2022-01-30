import { CategoriesRepository, StorageRepository, TracksRepository } from "@/services";
import { ICategoriesRepository, IStorageRepository, ITracksRepository } from "@/types";
import { container } from "inversify-props";

export class DependencyContainerHelper {
  public static buildDependencyContainer(): void {
    container.addSingleton<ITracksRepository>(TracksRepository);
    container.addSingleton<ICategoriesRepository>(CategoriesRepository);
    container.addSingleton<IStorageRepository>(StorageRepository);
  }
}
