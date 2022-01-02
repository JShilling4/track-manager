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
            hovering: isDragover,
          },
        ]"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="isDragover = false"
        @dragover.prevent.stop="isDragover = true"
        @dragenter.prevent.stop="isDragover = true"
        @dragleave.prevent.stop="isDragover = false"
        @drop.prevent.stop="onFileDrop($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <input
        type="file"
        multiple
        @change="onFileChange($event)"
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

<script lang="ts">
import { storage, tracksCollection } from "@/includes/firebase";
import { ITracksRepository, ITrackUpload, TrackDto } from "@/types";
import { inject } from "inversify-props";
import { Options, Vue } from "vue-class-component";

@Options({})
export default class TrackUpload extends Vue {
  @inject() tracksRepository!: ITracksRepository;

  private isDragover = false;
  private uploads: ITrackUpload[] = [];

  onFileChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length) {
      let files = [...target.files];
      this.uploadSongs(files);
    }

  }

  onFileDrop(e: DragEvent): void {
    this.isDragover = false;
    if (e.dataTransfer) {
      const files = [...e.dataTransfer.files];
      this.uploadSongs(files);
    }
  }

  uploadSongs(files: File[]): void {
    if (files) {
      files.forEach((file: File) => {
        if (file.type !== "audio/mpeg") {
          return;
        }
        const fileName = file.name.split(".").slice(0, -1).join(".");
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
            textClass: ""
          }) - 1;

        task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].currentProgress = progress;
          },
          (error) => {
            this.uploads[uploadIndex].variant = "errorColor";
            this.uploads[uploadIndex].icon = "fas fa-times";
            this.uploads[uploadIndex].textClass = "errorColor";
            console.log(error);
          },
          async () => {
            const track: TrackDto = {
              artist: "",
              originalName: task.snapshot.ref.name,
              modifiedName: task.snapshot.ref.name,
              category: "",
              lastUpdated: new Date().toISOString(),
              key: "",
              bpm: "",
              referenceLink: "",
              notes: "",
              docID: "",
              url: ""
            };

            track.url = await task.snapshot.ref.getDownloadURL();
            const trackRef = await tracksCollection.add(track);
            const trackSnapshot = await trackRef.get();

            this.$emit("upload", trackSnapshot);

            this.uploads[uploadIndex].variant = "successColor";
            this.uploads[uploadIndex].icon = "fas fa-check";
            this.uploads[uploadIndex].textClass = "successColor";
          }
        );
      });
    }
  }

  beforeUnmount(): void {
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  }
}
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
    padding: 0.5rem 2rem;
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
      transition: all 0.5s;
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

    .progress-bar {
      background-size: 1rem 1rem;
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      animation: progress-bar-stripes 1s linear infinite;
    }
  }
}

@keyframes progress-bar-stripes {
  0% {
    background-position: 1rem 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>