<template>
    <div class="trackItem-wrapper">
        <!-- Track Name -->
        <div
            class="trackItem"
            v-show="!showForm"
        >
            <h4 class="trackItem__heading">
                {{ track.artist ? `${track.artist} - ` : ''}} {{ track.modifiedName }}
            </h4>

            <div class="trackItem__controls">
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

            <form @submit.prevent="edit">
                <!-- Title -->
                <input-group>
                    <form-label>Name</form-label>
                    <text-input
                        type="text"
                        name="modifiedName"
                        v-model="localTrack.modifiedName"
                        class=""
                        placeholder="Enter Name"
                    />
                </input-group>

                <!-- Artist -->
                <input-group>
                    <form-label>Artist</form-label>
                    <text-input
                        type="text"
                        name="artist"
                        v-model="localTrack.artist"
                        class=""
                        placeholder="Enter Artist"
                    />
                </input-group>

                <!-- Key -->
                <input-group>
                    <form-label>Key</form-label>
                    <text-input
                        type="text"
                        name="key"
                        v-model="localTrack.key"
                        class=""
                        placeholder="Enter Key"
                    />
                </input-group>

                <!-- BPM -->
                <input-group>
                    <form-label>BPM</form-label>
                    <text-input
                        type="text"
                        name="bpm"
                        v-model="localTrack.bpm"
                        class=""
                        placeholder="Enter Name"
                    />
                </input-group>

                <!-- Category -->
                <input-group>
                    <form-label>Category</form-label>
                    <multi-select
                        name="category"
                        v-model="localTrack.category"
                        :options="[
                            'Alternative/Grunge',
                            'Outlaw Country',
                            'Boutique',
                            'Blues/Blues Rock',
                            '90s Country',
                            'Classic Rock',
                            'Hard Rock'
                        ]"
                        placeholder="Enter Category"
                    />
                </input-group>

                <!-- Reference -->
                <input-group>
                    <form-label>Reference Link</form-label>
                    <text-input
                        type="text"
                        name="category"
                        v-model="localTrack.referenceLink"
                        class=""
                        placeholder="Enter Reference Link"
                    />
                </input-group>

                <!-- Notes -->
                <input-group>
                    <form-label>Notes</form-label>
                    <textarea
                        type="text"
                        name="category"
                        v-model="localTrack.notes"
                        class=""
                        placeholder="Enter Notes"
                    />
                </input-group>

                <!-- Submit Form -->
                <base-button
                    type="submit"
                    class=""
                >
                    Submit
                </base-button>

                <!-- Go Back -->
                <base-button
                    type="button"
                    class=""
                    :disabled="inSubmission"
                    @click.prevent="showForm = false"
                >
                    Go Back
                </base-button>
            </form>
        </div>
    </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import { tracksCollection, storage } from "@/includes/firebase";
import cloneDeep from "lodash/cloneDeep";

export default {
    name: "TrackItem",
    components: {
        "multi-select": Multiselect,
    },
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
            alertVariant: "nuetralColor",
            alertMessage: "Please wait while the track info is updated...",
            localTrack: {},
        };
    },

    watch: {
        track() {
            this.localTrack = cloneDeep(this.track);
            delete this.localTrack.docID;
        },
    },

    methods: {
        async edit() {
            this.inSubmission = true;
            this.showAlert = true;
            this.alertVariant = "nuetralColor";
            this.alertMessage =
                "Please wait while the track info is updated...";

            try {
                await tracksCollection
                    .doc(this.track.docID)
                    .update(this.localTrack);
            } catch (error) {
                this.inSubmission = false;
                this.alertVariant = "errorColor";
                this.alertMessage =
                    "Something went wrong! Please try again later.";
            }

            this.updateTrack(this.index, this.localTrack);

            this.inSubmission = false;
            this.alertVariant = "successColor";
            this.alertMessage = "Track successfully updated!";
        },

        async deleteTrack() {
            const storageRef = storage.ref();
            const trackRef = storageRef.child(
                `tracks/${this.track.originalName}`
            );

            await trackRef.delete();

            await tracksCollection.doc(this.track.docID).delete();

            this.removeTrack(this.index);
        },
    },

    mounted() {
        this.localTrack = cloneDeep(this.track);
        delete this.localTrack.docID;
    },
};
</script>

<style lang="scss" scoped>
.trackItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1rem;
    border-bottom: 1px solid gray;
    &__heading {
        color: #333;
    }

    &__controls {
        button {
            margin: 0 1rem;
            height: 3rem;
            width: 3rem;
            cursor: pointer;
        }
    }
}


</style>