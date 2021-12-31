import { tracksCollection, storage } from "@/includes/firebase";

export default {
  state: {
    tracks: []
  },

  mutations: {
    ADD_TRACK(state, track) {
      state.tracks.push(track);
    },

    UPDATE_TRACK(state, payload) {
      const { trackIndex, track } = payload;
      state.tracks[trackIndex] = track;
    },

    REMOVE_TRACK(state, trackIndex) {
      state.tracks.splice(trackIndex, 1);
    }
  },

  actions: {
    fetchTracks({ dispatch }) {
      tracksCollection.get().then((trackSnapshots) => {
        trackSnapshots.forEach((document) => dispatch("addTrack", document));
      });
    },

    addTrack({ commit }, document) {
      const track = {
        ...document.data(),
        docID: document.id
      };
      commit("ADD_TRACK", track);
    },

    updateTrack({ commit, getters }, payload) {
      const { id, track } = payload;
      try {
        return tracksCollection
          .doc(id)
          .update(track)
          .then(() => {
            const trackIndex = getters.getTrackIndex(id);
            commit("UPDATE_TRACK", { trackIndex, track });
            return true;
          });
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    // async removeTrack({ commit, getters }, track) {
    //   const storageRef = storage.ref();
    //   const trackRef = storageRef.child(`tracks/${track.originalName}`);

    //   await trackRef.delete();

    //   await tracksCollection.doc(track.docID).delete();

    //   const trackIndex = getters.getTrackIndex(track.docID);
    //   commit("REMOVE_TRACK", trackIndex);
    // }
  }

  // getters: {
  //   getTrackIndex: (state) => (id) => {
  //     const index = state.tracks.findIndex((t) => t.docID === id);
  //     return index;
  //   }
  // }
};
