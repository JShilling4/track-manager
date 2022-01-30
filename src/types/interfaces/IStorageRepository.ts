import firebase from "firebase/app";

export interface IStorageRepository {
  put(file: File): firebase.storage.UploadTask;
  download(modifiedName: string): Promise<string>;
  delete(originalName: string): Promise<void>;
}
