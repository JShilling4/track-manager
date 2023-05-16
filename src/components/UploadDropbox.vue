<script setup lang="ts">
import { tracksRepository } from "../repositories/tracksRepository";
import { storageRepository } from "../repositories/storageRepository";
import { ITrackUpload, ITrack } from "../types";
import { addToUITrackListKey } from "../symbols";
import { inject, onBeforeUnmount, ref } from "vue";

const props = defineProps<{
  track?: ITrack;
}>();

const emit = defineEmits<{
  (e: "edit", track: ITrack): void;
}>();

const isDragover = ref<boolean>(false);
const uploads = ref<ITrackUpload[]>([]);

const addToUITrackList = inject(addToUITrackListKey);
if (addToUITrackList === undefined) {
  throw new Error("Failed to inject 'addToUITrackList'");
}

function onFileChange(e: Event): void {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length) {
    let files = [...target.files];
    uploadSongs(files);
  }
}

function onFileDrop(e: DragEvent): void {
  isDragover.value = false;
  if (e.dataTransfer) {
    const files = [...e.dataTransfer.files];
    uploadSongs(files);
  }
}

function uploadSongs(files: File[]): void {
  if (files) {
    files.forEach(async (file: File) => {
      // stop if file is not mp3
      if (file.type !== "audio/mpeg") {
        return;
      }
      // Delete the file first if it exists
      if (props.track) {
        await storageRepository.delete(props.track.originalName);
      }
      const task = storageRepository.put(file);

      const uploadIndex =
        uploads.value.push({
          task,
          currentProgress: 0,
          name: file.name.split(".").slice(0, -1).join("."),
          variant: "neutralColor",
          icon: "fas fa-spinner fa-spin",
          textClass: "",
        }) - 1;

      task.on(
        "state_changed",
        (snapshot) => {
          console.log("new track state change: ", snapshot);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploads.value[uploadIndex].currentProgress = progress;
        },
        (error) => {
          uploads.value[uploadIndex].variant = "errorColor";
          uploads.value[uploadIndex].icon = "fas fa-times";
          uploads.value[uploadIndex].textClass = "errorColor";
          console.log(error);
        },
        async () => {
          const track: ITrack = {
            ...(props.track
              ? props.track
              : {
                  artist: "",
                  originalName: task.snapshot.ref.name,
                  modifiedName: task.snapshot.ref.name,
                  category: "",
                  key: "",
                  length: "-1",
                  bpm: "",
                  referenceLink: "",
                  lastUpdated: "",
                  notes: "",
                  docID: "",
                  url: "",
                }),
            lastUpdated: new Date().toISOString(),
          };
          track.url = await task.snapshot.ref.getDownloadURL();
          console.log(track);
          console.log("adding track to FB: ", track);
          const trackRef = await tracksRepository.add(track);
          const trackSnapshot = await trackRef.get();
          console.log("adding track to UI: ", trackSnapshot);
          addToUITrackList && addToUITrackList(trackSnapshot);
          // emit("edit", track);

          uploads.value[uploadIndex].variant = "successColor";
          uploads.value[uploadIndex].icon = "fas fa-check";
          uploads.value[uploadIndex].textClass = "successColor";
        }
      );
    });
  }
}

onBeforeUnmount(() => {
  uploads.value.forEach((upload) => {
    upload.task.cancel();
  });
});
</script>

<template>
  <div class="dropbox">
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
