<template>
  <div class="trackItem-wrapper">
    <!-- Track Name -->
    <div class="trackItem">
      <h4 class="trackItem__heading">
        {{ track.modifiedName }} - <span class="artist">{{ track.artist }}</span>
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

    <EditTrackModal
      :is-showing="editModalShowing"
      :track="track"
      :categories="categories"
      @close="editModalShowing = false"
    />
  </div>
</template>

<script lang="ts">
import EditTrackModal from "./EditTrackModal.vue";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { CategoryDto, ITracksRepository, TrackDto } from "@/types";
import { inject } from "inversify-props";

@Options({
  name: "TrackItem",
  components: {
    EditTrackModal
  },
  emits: ["play", "delete"]
})
export default class TrackItem extends Vue {
@inject() tracksRepository!: ITracksRepository

  @Prop({
    type: Object,
  })
  track!: TrackDto

  @Prop({
    type: Object,
  })
  categories!: CategoryDto[]

  private editModalShowing = false;

  closeEditModal(): void {
    this.editModalShowing = false;
  }

  async deleteTrack(): Promise<void> {
    await this.tracksRepository.delete(this.track);
    this.$emit("delete");
  }

  async downloadTrack(): Promise<void> {
    const url = await this.tracksRepository.download(this.track.modifiedName);
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

  playTrack(): void {
    this.$emit("play");
  }
};
</script>

<style lang="scss" scoped>
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
  }

  &__controls {
    display: flex;
    .icon {
      margin: 0 1rem;
    }
  }
}
</style>