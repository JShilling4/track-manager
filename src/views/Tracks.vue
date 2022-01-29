<template>
  <section class="page-wrapper container">
    <h2>Tracks</h2>
    <div class="content">
      <!-- Upload Area -->
      <div class="upload-container">
        <TrackUpload />
      </div>

      <!-- Uploaded List -->
      <div class="mainList-container">
        <div class="categoryFilter">
          <Multiselect
            name="category"
            label="name"
            value-prop="name"
            v-model="selectedCategory"
            :options="categoriesFilterList"
            placeholder="Enter Category"
          />
        </div>
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

<script lang="ts">
import TrackItem from "@/components/TrackItem.vue";
import TrackUpload from "@/components/TrackUpload.vue";
import Multiselect from "@vueform/multiselect";
import { Options, Vue } from "vue-class-component";
import {
  TrackDto,
  ITracksRepository,
  CategoryDto,
  ICategoriesRepository
} from "@/types";
import { inject } from "inversify-props";
import MusicPlayer from "@/components/MusicPlayer.vue";
import firebase from "firebase/app";
import { Provide } from "vue-property-decorator";

@Options({
  name: "TracksPage",
  components: {
    TrackUpload,
    TrackItem,
    Multiselect,
    MusicPlayer
  }
})
export default class TracksPage extends Vue {
  @inject() private tracksRepository!: ITracksRepository;
  @inject() private categoriesRepository!: ICategoriesRepository;

  private selectedCategory = "All";
  private categories: CategoryDto[] = [];
  private tracks: TrackDto[] = [];

  async created(): Promise<void> {
    this.tracks = await this.tracksRepository.getAll();
    this.categories = await this.categoriesRepository.getAll();
  }

  playTrack(track: TrackDto): void {
    const musicPlayerRef = this.$refs.musicPlayerRef as InstanceType<
      typeof MusicPlayer
    >;
    musicPlayerRef.newSong(track);
  }

  removeTrack(track: TrackDto): void {
    const trackIndex = this.tracks.findIndex((t) => t.docID === track.docID);
    this.tracks.splice(trackIndex, 1);
  }

  @Provide() private addToUITrackList(
    document: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
  ): void {
    const {
      artist,
      bpm,
      category,
      key,
      lastUpdated,
      modifiedName,
      notes,
      originalName,
      referenceLink,
      url
    } = document.data();

    this.tracks.push({
      docID: document.id,
      artist,
      bpm,
      category,
      key,
      lastUpdated,
      modifiedName,
      notes,
      originalName,
      referenceLink,
      url
    });
  }

  @Provide() private updateUITrackList(track: TrackDto): void {
    const index = this.tracks.findIndex(t => t.docID === track.docID);
    if (index !== -1) {
      this.tracks.splice(index, 1, track);
    }
  }

  get categoriesFilterList(): string[] {
    let list = this.categories.map((category) => {
      return category.name;
    });
    list.push("All");
    return list;
  }

  get selectedTracks(): TrackDto[] {
    return this.selectedCategory === "All"
      ? this.tracks
      : this.tracks.filter((track) => track.category === this.selectedCategory);
  }
}
</script>

<style lang="scss" scoped>
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

.upload-container {
  width: 30%;
  @include breakpoint(tablet-land) {
    width: 100%;
    order: 2;
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