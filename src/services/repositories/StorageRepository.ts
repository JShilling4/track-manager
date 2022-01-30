import { storage } from "@/includes/firebase";
import { IStorageRepository } from "@/types";
import { injectable } from "inversify-props";
import firebase from "firebase/app";

@injectable()
export class StorageRepository implements IStorageRepository {
  public put(file: File): firebase.storage.UploadTask {
    const fileName = file.name.split(".").slice(0, -1).join(".");
    const storageRef = storage.ref();
    const trackRef = storageRef.child(`tracks/${fileName}`);
    return trackRef.put(file);
  }

  public async download(modifiedName: string): Promise<string> {
    const storageRef = storage.ref();
    return storageRef.child(`tracks/${modifiedName}`).getDownloadURL();
  }

  public async delete(oriignalName: string): Promise<void> {
    const storageRef = storage.ref();
    const trackRef = storageRef.child(`tracks/${oriignalName}`);
    return await trackRef.delete();
  }
}