export interface ITrackUpload {
  task: firebase.default.storage.UploadTask;
  currentProgress: number;
  name: string;
  variant: string;
  icon: string;
  textClass: string | null;
}
