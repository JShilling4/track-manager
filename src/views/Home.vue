<script setup lang="ts">
import TrackItem from "../components/TrackItem.vue";
import TrackUpload from "../components/TrackUpload.vue";
import MusicPlayer from "../components/MusicPlayer.vue";
import { tracksRepository } from "../repositories/tracksRepository";
import { categoriesRepository } from "../repositories/categoriesRepository";
import { AddToUITrackListFunction, ICategory, ITrack } from "../types";
import { addToUITrackListKey, updateUITrackListKey } from "../symbols";
import { firebase } from "../repositories/clients/firebaseClient";
import { computed, onBeforeMount, provide, ref } from "vue";

const selectedCategory = ref<string>("All");
const categories = ref<ICategory[]>([]);
const tracks = ref<ITrack[]>([]);
const musicPlayerRef = ref<InstanceType<typeof MusicPlayer> | null>(null);

const categoriesFilterList = computed<string[]>(() => {
  let list = categories.value.map((category) => {
    return category.name;
  });
  list.push("All");
  return list;
});

const selectedTracks = computed<ITrack[]>(() => {
  return selectedCategory.value === "All"
    ? tracks.value
    : tracks.value.filter((track) => track.category === selectedCategory.value);
});

function playTrack(track: ITrack): void {
  musicPlayerRef?.value?.newSong(track);
}

function removeTrack(track: ITrack): void {
  const trackIndex = tracks.value.findIndex((t) => t.docID === track.docID);
  tracks.value.splice(trackIndex, 1);
}

function addToUITrackList(
  document: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): void {
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

  tracks.value.push({
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
}
provide(addToUITrackListKey, addToUITrackList as AddToUITrackListFunction);

function updateUITrackList(track: ITrack): void {
  const index = tracks.value.findIndex((t) => t.docID === track.docID);
  if (index !== -1) {
    tracks.value.splice(index, 1, track);
  }
}
provide(updateUITrackListKey, updateUITrackList);

function categoryCount(categoryName: string): number {
  return categoryName === "All"
    ? tracks.value.length
    : tracks.value.filter((track) => track.category === categoryName).length;
}

onBeforeMount(async () => {
  tracks.value = await tracksRepository.getAll();
  categories.value = await categoriesRepository.getAll();
});
</script>

<template>
  <section class="page-wrapper container">
    <div class="content">
      <div class="col1">
        <TrackUpload />
        <div class="categories-container">
          <h3>Categories</h3>
          <ul>
            <li
              class="category-line"
              :class="{ selected: selectedCategory === category }"
              v-for="category in categoriesFilterList"
              :key="category"
            >
              <span class="count">{{ `(${categoryCount(category)})` }}</span>
              <span @click="selectedCategory = category">{{ category }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- Uploaded List -->
      <div class="mainList-container">
        <div class="mainList">
          <!-- Header -->
          <div class="mainList__header">
            <h2 class="heading">
              {{ selectedCategory }} ({{ selectedTracks.length }})
            </h2>
          </div>
          <!-- List Items -->
          <div class="mainList__item-container">
            <div
              v-for="track in selectedTracks"
              :key="track.docID"
              class="track-container"
            >
              <TrackItem
                :track="track"
                :categories="categories"
                @play="playTrack(track)"
                @delete="removeTrack(track)"
              />
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <MusicPlayer ref="musicPlayerRef" />
</template>

<style lang="scss" scoped>
@use "../scss/mixins" as *;

h2 {
  margin-bottom: 2rem;
}
.content {
  display: flex;
  padding-bottom: 8rem;
  @include breakpoint(tablet-land) {
    flex-wrap: wrap;
  }
}

.col1 {
  width: 30%;
  @include breakpoint(tablet-land) {
    width: 100%;
    order: 2;
  }
  .categories-container {
    margin-top: 2rem;
    h3 {
      margin-bottom: 1rem;
    }
    .category-line {
      cursor: pointer;
      .count {
        display: inline-block;
        width: 4rem;
      }
      &.selected {
        color: var(--color-primary);
        font-weight: bold;
      }
    }
  }
}

.mainList-container {
  flex: 1;
  margin-left: 12rem;
  @include breakpoint(tablet-land) {
    margin-left: 0;
  }
  .categoryFilter {
    margin-bottom: 2rem;
    width: 25rem;
  }
  .mainList {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 2rem;
      font-weight: bold;
      border: 2px solid gray;
    }
    &__item-container {
      padding: 1rem;
      @include breakpoint(tablet-port) {
        padding: 1rem 0;
      }
      .emptyCategory {
        padding: 2rem 1rem;
      }
    }
  }
}
</style>
