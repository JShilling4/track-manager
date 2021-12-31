import { TrackDto } from "@/types";

export interface ITracksRepository {
  getAll(): Promise<TrackDto[]>;
  delete(track: TrackDto): Promise<void>;
}
