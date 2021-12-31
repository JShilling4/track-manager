import { storage, tracksCollection } from "@/includes/firebase";
import { ITracksRepository, TrackDto } from "@/types";
import { injectable } from "inversify-props";

@injectable()
export class TracksRepository implements ITracksRepository {
  public async getAll(): Promise<TrackDto[]> {
    const trackSnapshots = await tracksCollection.get();
    const tracks: TrackDto[] = [];

    trackSnapshots.forEach((document) => {
      const {
        artist,
        bpm,
        category,
        key,
        lastUpdated,
        modifiedName,
        notes,
        originalName,
        referenceLink,
        url
      } = document.data();

      tracks.push({
        docID: document.id,
        artist,
        bpm,
        category,
        key,
        lastUpdated,
        modifiedName,
        notes,
        originalName,
        referenceLink,
        url
      });
    });

    return tracks;
  }

  public async delete(track: TrackDto): Promise<void> {
    const storageRef = storage.ref();
    const trackRef = storageRef.child(`tracks/${track.originalName}`);

    await trackRef.delete();

    await tracksCollection.doc(track.docID).delete();
  }
}
