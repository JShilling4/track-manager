import { TrackDto } from "@/types";

export interface ITracksRepository {
  getAll(): Promise<TrackDto[]>;
  update(track: TrackDto): Promise<TrackDto> | Promise<never>;
  delete(track: TrackDto): Promise<void>;
  download(modifiedName: string): Promise<string>;
}
