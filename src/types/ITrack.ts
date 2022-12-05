import { firebase } from "../repositories/clients/firebaseClient";

export interface ITrack {
  id?: string;
  docID?: string;
  artist: string;
  bpm: string;
  category: string;
  key: string;
  length: string;
  lastUpdated: string;
  modifiedName: string;
  notes: string;
  originalName: string;
  referenceLink: string;
  url: string;
}

export type AddToUITrackListFunction = (
  document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
) => void;

export type UpdateUITrackListFunction = (track: ITrack) => void;
