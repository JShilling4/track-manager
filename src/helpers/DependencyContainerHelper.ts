import { CategoriesRepository, TracksRepository } from "@/services";
import { ICategoriesRepository, ITracksRepository } from "@/types";
import { container } from "inversify-props";

export class DependencyContainerHelper {
  public static buildDependencyContainer(): void {
    container.addSingleton<ICategoriesRepository>(CategoriesRepository);
    container.addSingleton<ITracksRepository>(TracksRepository);
  }
}
