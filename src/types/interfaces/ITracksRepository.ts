import { TrackDto } from "@/types";
import firebase from "firebase/app";

export interface ITracksRepository {
  getAll(): Promise<TrackDto[]>;
  update(track: TrackDto): Promise<TrackDto> | Promise<never>;
  delete(track: TrackDto): Promise<void>;
  add(
    track: TrackDto
  ): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>;
}
