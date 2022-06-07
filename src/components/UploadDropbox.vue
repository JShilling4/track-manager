<template>
  <div class="dropbox">
    <!-- Upload Dropbox -->
    <div
      :class="[
        'container',
        {
          hovering: isDragover
        }
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
    <input type="file" multiple @change="onFileChange($event)" />
    <hr class="hr" />

    <!-- Progess Bars -->
    <div v-for="upload in uploads" :key="upload.name" class="progressBar">
      <!-- File Name -->
      <div class="progressBar__fileName" :class="upload.textClass">
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
</template>

<script lang="ts">
import type {
  IStorageRepository,
  ITracksRepository,
  ITrackUpload,
  TrackDto
} from "@/types";
import { inject } from "inversify-props";
import { Options, Vue } from "vue-class-component";
import { Inject, Prop } from "vue-property-decorator";
import firebase from "firebase/app";

@Options({})
export default class UploadDropbox extends Vue {
  @inject() tracksRepository!: ITracksRepository;
  @inject() storageRepository!: IStorageRepository;

  @Inject() private addToUITrackList!: (
    track: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ) => void;

  @Prop({
    type: Object,
    default: null
  })
  track!: TrackDto;

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
      files.forEach(async (file: File) => {
        // stop if file is not mp3
        if (file.type !== "audio/mpeg") {
          return;
        }
        // Delete the file first if it exists
        if (this.track) {
          await this.storageRepository.delete(this.track.originalName);
        }
        const task = this.storageRepository.put(file);

        const uploadIndex =
          this.uploads.push({
            task,
            currentProgress: 0,
            name: file.name.split(".").slice(0, -1).join("."),
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
              ...(this.track
                ? this.track
                : {
                    artist: "",
                    originalName: task.snapshot.ref.name,
                    modifiedName: task.snapshot.ref.name,
                    category: "",
                    key: "",
                    length: -1,
                    bpm: "",
                    referenceLink: "",
                    notes: "",
                    docID: "",
                    url: ""
                  }),
              lastUpdated: new Date().toISOString()
            };
            track.url = await task.snapshot.ref.getDownloadURL();

            if (!this.track) {
              const trackRef = await this.tracksRepository.add(track);
              const trackSnapshot = await trackRef.get();
              this.addToUITrackList(trackSnapshot);
            } else {
              this.$emit("edit", track);
            }

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
.dropbox {
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
</style>
