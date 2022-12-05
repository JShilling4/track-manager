import { storage, firebase } from "./clients/firebaseClient";

export default {
  put(file: File): firebase.storage.UploadTask {
    const fileName = file.name.split(".").slice(0, -1).join(".");
    const storageRef = storage.ref();
    const trackRef = storageRef.child(`tracks/${fileName}`);
    return trackRef.put(file);
  },

  async download(modifiedName: string): Promise<string> {
    const storageRef = storage.ref();
    return storageRef.child(`tracks/${modifiedName}`).getDownloadURL();
  },

  async delete(oriignalName: string): Promise<void> {
    const storageRef = storage.ref();
    const trackRef = storageRef.child(`tracks/${oriignalName}`);
    return await trackRef.delete();
  },
};
