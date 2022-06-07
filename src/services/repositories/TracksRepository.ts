import { tracksCollection } from "@/includes/firebase";
import firebase from "firebase/app";
import type { IStorageRepository, ITracksRepository } from "@/types";
import { TrackDto } from "@/types";
import { inject, injectable } from "inversify-props";

@injectable()
export class TracksRepository implements ITracksRepository {
  @inject() storageRepository!: IStorageRepository;

  public async getAll(): Promise<TrackDto[]> {
    const trackSnapshots = await tracksCollection.get();
    const tracks: TrackDto[] = [];

    trackSnapshots.forEach((document) => {
      const {
        artist,
        bpm,
        category,
        key,
        length,
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
        length,
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

  public async update(track: TrackDto): Promise<TrackDto | never> {
    try {
      await tracksCollection.doc(track.docID).update(track);
      return track;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async delete(track: TrackDto): Promise<void> {
    await this.storageRepository.delete(track.originalName);
    return await tracksCollection.doc(track.docID).delete();
  }

  public async add(
    track: TrackDto
  ): Promise<
    firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  > {
    return await tracksCollection.add(track);
  }
}
