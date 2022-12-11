import { firebase } from "../repositories/clients/firebaseClient";
import { ITrack } from "./ITrack";

export interface ITracksRepository {
  getAll(): Promise<ITrack[]>;
  update(track: ITrack): Promise<ITrack | never>;
  delete(track: ITrack): Promise<void>;
  add(
    track: ITrack
  ): Promise<
    firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  >;
}
