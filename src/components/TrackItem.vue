<script setup lang="ts">
import EditTrackModal from "./EditTrackModal.vue";
import { tracksRepository } from "../repositories/tracksRepository";
import { storageRepository } from "../repositories/storageRepository";
import { ICategory, ITrack } from "../types";
import { computed, inject, ref } from "vue";

const props = defineProps<{
  track: ITrack;
  categories: ICategory[];
}>();

const emit = defineEmits<{
  (e: "play"): void;
  (e: "delete"): void;
}>();

const editModalShowing = ref<boolean>(false);
const dayjs = inject("dayJS") as any;

const trackLengthDisplay = computed<string>(() => {
  const minutes = Math.floor(Number(props.track.length) / 60);
  let seconds = String(Number(props.track.length) % 60);
  seconds = seconds.charAt(0) == seconds ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
});

function closeEditModal(): void {
  editModalShowing.value = false;
}

async function deleteTrack(): Promise<void> {
  await tracksRepository.delete(props.track);
  emit("delete");
}

async function downloadTrack(): Promise<void> {
  const url = await storageRepository.download(props.track.modifiedName);
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = () => {
    const downloadUrl = URL.createObjectURL(xhr.response);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display: none");
    a.href = downloadUrl;
    a.download = "";
    a.click();
  };
  xhr.open("GET", url);
  xhr.send();
}

function playTrack(): void {
  emit("play");
}
</script>

<template>
  <div class="trackItem-wrapper">
    <!-- Track Name -->
    <div class="trackItem">
      <h4 class="trackItem__heading">
        {{ track.modifiedName }} -
        <span class="artist">{{ track.artist }}</span>
        <span class="trackLength"> ({{ trackLengthDisplay }})</span>
        <p class="lastUpdated">
          Last Updated:
          {{ dayjs(track.lastUpdated).format("MM-DD-YYYY h:mma") }}
        </p>
      </h4>
      <div class="trackItem__controls">
        <font-awesome-icon
          class="icon icon--delete"
          icon="fa-solid fa-trash"
          @click.prevent="deleteTrack"
        ></font-awesome-icon>
        <font-awesome-icon
          class="icon icon--edit"
          icon="fa-solid fa-pencil"
          @click.prevent="editModalShowing = !editModalShowing"
        ></font-awesome-icon>
        <font-awesome-icon
          class="icon icon--download"
          icon="fa-solid fa-download"
          @click.prevent="downloadTrack"
        ></font-awesome-icon>
        <font-awesome-icon
          class="far fa-play-circle icon icon--play"
          icon="fa-solid fa-play"
          @click.prevent="playTrack"
        ></font-awesome-icon>
      </div>
    </div>
    <EditTrackModal
      :is-showing="editModalShowing"
      :track="track"
      :categories="categories"
      @close="editModalShowing = false"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "../scss/mixins" as *;

.trackItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1rem;
  @include breakpoint(tablet-port) {
    padding: 1rem 0;
  }
  &__heading {
    color: #333;
    .lastUpdated {
      font-size: 1.2rem;
      font-weight: 400;
    }
    .artist {
      color: rgb(150, 150, 150);
    }
    .trackLength {
      font-size: 1.2rem;
      font-weight: 300;
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
