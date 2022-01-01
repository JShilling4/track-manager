import { TrackDto } from "@/types";

export interface ITracksRepository {
  getAll(): Promise<TrackDto[]>;
  update(track: TrackDto): Promise<void>;
  delete(track: TrackDto): Promise<void>;
}
