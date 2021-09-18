<template>
    <div class="trackItem-wrapper">
        <!-- Track Name -->
        <div class="trackItem">
            <h4 class="trackItem__heading">
                {{ track.artist ? `${track.artist} - ` : ''}} {{ track.modifiedName }}
                <p class="lastUpdated">
                    Last Updated: {{ $dayjs(track.lastUpdated).format('MM-DD-YYYY h:mma') }}
                </p>
            </h4>

            <div class="trackItem__controls">
                <i
                    class="fa fa-trash-alt icon icon--delete"
                    @click.prevent="deleteTrack"
                ></i>
                <i
                    class="fa fa-pencil-alt icon icon--edit"
                    @click.prevent="editModalShowing = !editModalShowing"
                ></i>
                <i
                    class="fas fa-download icon icon--download"
                    @click.prevent="downloadTrack"
                ></i>
                <i
                    class="far fa-play-circle icon icon--play"
                    @click.prevent="playTrack"
                ></i>
            </div>
        </div>

        <edit-track-modal
            :is-showing="editModalShowing"
            :track="track"
            @close="editModalShowing = false"
        />

    </div>
</template>

<script>
import EditTrackModal from "./EditTrackModal.vue";
import { storage } from "../includes/firebase";

export default {
    name: "TrackItem",
    components: {
        "edit-track-modal": EditTrackModal,
    },

    props: {
        track: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            editModalShowing: false,
        };
    },

    methods: {
        closeEditModal() {
            this.editModalShowing = false;
        },

        async deleteTrack() {
            this.$store.dispatch("removeTrack", this.track);
        },

        async downloadTrack() {
            const storageRef = storage.ref();
            storageRef
                .child(`tracks/${this.track.modifiedName}`)
                .getDownloadURL()
                .then((url) => {
                    // `url` is the download URL for 'images/stars.jpg'

                    // This can be downloaded directly:
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = "blob";
                    xhr.onload = () => {
                        const downloadUrl = URL.createObjectURL(xhr.response);
                        const a = document.createElement("a");
                        document.body.appendChild(a);
                        a.style = "display: none";
                        a.href = downloadUrl;
                        a.download = "";
                        a.click();
                    };
                    xhr.open("GET", url);
                    xhr.send();
                })
                .catch((error) => {
                    // Handle any errors
                    console.log(error);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.trackItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1rem;
    /* border-bottom: 1px solid gray; */
    &__heading {
        color: #333;
        .lastUpdated {
            font-size: 1.2rem;
            font-weight: 400;
        }
    }

    &__controls {
        display: flex;
        .icon {
            margin: 0 1rem;
        }
    }
}
</style>