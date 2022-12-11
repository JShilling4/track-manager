import { firebase } from "../repositories/clients/firebaseClient";

export interface IStorageRepository {
  put(file: File): firebase.storage.UploadTask;
  download(modifiedName: string): Promise<string>;
  delete(oriignalName: string): Promise<void>;
}
