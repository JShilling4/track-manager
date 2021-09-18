<template>
    <div class="track-upload">
        <div class="track-upload__header">
            <h2 class="heading">Upload</h2>
            <i class="fas fa-upload icon"></i>
        </div>
        <div class="track-upload__dropbox">
            <!-- Upload Dropbox -->
            <div
                :class="[
                    'container',
                    {
                        'hovering': isDragover
                    }
                ]"
                @drag.prevent.stop=""
                @dragstart.prevent.stop=""
                @dragend.prevent.stop="isDragover = false"
                @dragover.prevent.stop="isDragover = true"
                @dragenter.prevent.stop="isDragover = true"
                @dragleave.prevent.stop="isDragover = false"
                @drop.prevent.stop="uploadSong($event)"
            >
                <h5>Drop your files here</h5>
            </div>
            <input
                type="file"
                multiple
                @change="uploadSong($event)"
            />
            <hr class="hr" />

            <!-- Progess Bars -->
            <div
                v-for="upload in uploads"
                :key="upload.name"
                class="progressBar"
            >
                <!-- File Name -->
                <div
                    class="progressBar__fileName"
                    :class="upload.textClass"
                >
                    <i :class="upload.icon"></i> {{ upload.name }}
                </div>

                <!-- Inner Progress Bar -->
                <div class="progressBar__fill">
                    <div
                        class="transition-all progress-bar"
                        :class="upload.variant"
                        :style="{ width: upload.currentProgress + '%' }"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { storage, tracksCollection } from "@/includes/firebase";

export default {
    name: "Upload",
    data() {
        return {
            isDragover: false,
            uploads: [],
        };
    },

    methods: {
        ...mapActions(["addTrack"]),

        uploadSong(event) {
            this.isDragover = false;

            const files = event.dataTransfer
                ? [...event.dataTransfer.files]
                : [...event.target.files];
            files.forEach((file) => {
                if (file.type !== "audio/mpeg") {
                    return;
                }
                const fileName = file.name.split('.').slice(0, -1).join('.');
                const storageRef = storage.ref(); // music-hub-d0bcb.appspot.com
                const tracksRef = storageRef.child(`tracks/${fileName}`); // music-hub-d0bcb.appspot.com/songs/example.mp3
                const task = tracksRef.put(file);

                const uploadIndex =
                    this.uploads.push({
                        task,
                        currentProgress: 0,
                        name: fileName,
                        variant: "neutralColor",
                        icon: "fas fa-spinner fa-spin",
                        textClass: "",
                    }) - 1;

                task.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        this.uploads[uploadIndex].currentProgress = progress;
                    },
                    (error) => {
                        this.uploads[uploadIndex].variant = "errorColor";
                        this.uploads[uploadIndex].icon = "fas fa-times";
                        this.uploads[uploadIndex].textClass = "errorColor";
                        console.log(error);
                    },
                    async () => {
                        const track = {
                            artist: "",
                            originalName: task.snapshot.ref.name,
                            modifiedName: task.snapshot.ref.name,
                            category: "",
                            lastUpdated: new Date().toISOString(),
                            key: "",
                            bpm: "",
                            referenceLink: "",
                            notes: ""
                        };

                        track.url = await task.snapshot.ref.getDownloadURL();
                        const trackRef = await tracksCollection.add(track);
                        const trackSnapshot = await trackRef.get();

                        this.addTrack(trackSnapshot);

                        this.uploads[uploadIndex].variant = "successColor";
                        this.uploads[uploadIndex].icon = "fas fa-check";
                        this.uploads[uploadIndex].textClass = "successColor";
                    }
                );
            });
        },
    },

    beforeUnmount() {
        this.uploads.forEach((upload) => {
            upload.task.cancel();
        });
    },
};
</script>

<style lang="scss" scoped>
.track-upload {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 5px;
    border: 2px solid gray;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .5rem 2rem;
        font-weight: bold;
        border-bottom: 2px solid gray;

        .icon {
            color: var(--color-primary);
            font-size: 2rem;
        }
    }

    &__dropbox {
        padding: 2rem;

        .container {
            width: 100%;
            padding: 5rem 2.5rem;
            border-radius: 5px;
            text-align: center;
            cursor: pointer;
            border: 2px dashed gray;
            transition: all .5s;
            &:hover {
                color: #fff;
                background-color: var(--color-primary);
            }
        }

        input {
            margin-top: 2rem;
        }

        .hr {
            margin: 3rem 0;
        }
    }
}
</style>