import { tracksCollection, firebase } from "./clients/firebaseClient";
import { storageRepository } from "./storageRepository";
import type { ITrack } from "../types/ITrack";

export const tracksRepository = {
  async getAll(): Promise<ITrack[]> {
    const trackSnapshots = await tracksCollection.get();
    const tracks: ITrack[] = [];

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
        url,
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
        url,
      });
    });

    return tracks;
  },

  async update(track: ITrack): Promise<ITrack | never> {
    try {
      await tracksCollection.doc(track.docID).update(track);
      return track;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async delete(track: ITrack): Promise<void> {
    await storageRepository.delete(track.originalName);
    return await tracksCollection.doc(track.docID).delete();
  },

  async add(
    track: ITrack
  ): Promise<
    firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  > {
    return await tracksCollection.add(track);
  },
};
