<template>
    <div class="trackItem-wrapper">
        <!-- Track Name -->
        <div class="trackItem" v-show="!showForm">
            <h4 class="">
                {{ track.modifiedName }}
            </h4>

            <div class="track-controls">
                <button
                    type="button"
                    class=""
                    @click.prevent="deleteTrack"
                >
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button
                    type="button"
                    class=""
                    @click.prevent="showForm = !showForm"
                >
                    <i class="fa fa-pencil-alt"></i>
                </button>
            </div>
        </div>

        <!-- Edit Form -->
        <div v-show="showForm">
            <!-- Alert Message -->
            <div
                v-if="showAlert"
                class=""
                :class="alertVariant"
            >
                {{ alertMessage }}
            </div>

            <form @submit="edit">
                <!-- Title -->
                <div class="">
                    <label class="">Track Title</label>
                    <input
                        type="text"
                        name="modifiedName"
                        class=""
                        placeholder="Enter Track Title"
                        @input="updateUnsavedFlag(true)"
                    />
                </div>

                <!-- Genre -->
                <div class="mb-3">
                    <label class="inline-block mb-2">Genre</label>
                    <input
                        type="text"
                        name="genre"
                        class=""
                        placeholder="Enter Genre"
                        @input="updateUnsavedFlag(true)"
                    />
                </div>

                <!-- Submit Form -->
                <button
                    type="submit"
                    class=""
                >
                    Submit
                </button>

                <!-- Go Back -->
                <button
                    type="button"
                    class=""
                    :disabled="inSubmission"
                    @click.prevent="showForm = false"
                >
                    Go Back
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { tracksCollection, storage } from "@/includes/firebase";

export default {
    name: "TrackItem",
    props: {
        track: {
            type: Object,
            required: true,
        },
        updateTrack: {
            type: Function,
            required: true,
        },
        removeTrack: {
            type: Function,
            required: true,
        },
        updateUnsavedFlag: {
            type: Function,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            showForm: false,
            inSubmission: false,
            showAlert: false,
            alertVariant: "bg-blue-500",
            alertMessage: "Please wait while the track info is updated...",
        };
    },

    methods: {
        async edit(values) {
            this.inSubmission = true;
            this.showAlert = true;
            this.alertVariant = "bg-blue-500";
            this.alertMessage = "Please wait while the track info is updated...";

            try {
                await tracksCollection.doc(this.track.docID).update(values);
            } catch (error) {
                this.inSubmission = false;
                this.alertVariant = "bg-red-500";
                this.alertMessage =
                    "Something went wrong! Please try again later.";
            }

            this.updateTrack(this.index, values);
            this.updateUnsavedFlag(false);

            this.inSubmission = false;
            this.alertVariant = "bg-green-500";
            this.alertMessage = "Track successfully updated!";
        },

        async deleteTrack() {
            const storageRef = storage.ref();
            const trackRef = storageRef.child(`tracks/${this.track.originalName}`);

            await trackRef.delete();

            await tracksCollection.doc(this.track.docID).delete();

            this.removeTrack(this.index);
        },
    },
};
</script>

<style lang="scss" scoped>
.trackItem-wrapper {

}

.trackItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1rem;
    border-bottom: 1px solid gray;
    .track-controls {
        button {
            margin: 0 1rem;
            height: 3rem;
            width: 3rem;
            cursor: pointer;
        }
    }
}
</style>