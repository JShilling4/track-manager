<template>
  <base-modal
    width="60rem"
    :show="isShowing"
    :show-close-button="false"
    :clickaway="true"
    background-color="#fff"
    @close="$emit('close')"
  >
    <template v-slot:body>
      <!-- Edit Form -->
      <div>
        <!-- Alert Message -->
        <div
          v-if="showAlert"
          class="alertMessage"
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
              placeholder="Enter Tempo"
            />
          </input-group>

          <!-- Category -->
          <input-group>
            <form-label>Category</form-label>
            <multi-select
              name="category"
              label="name"
              value-prop="name"
              v-model="localTrack.category"
              :options="categories"
              placeholder="Enter Category"
              @select="setLocalCategory"
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
            <text-input
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
          > Submit </base-button>

          <!-- Go Back -->
          <base-button
            type="button"
            class=""
            :disabled="inSubmission"
            @click.prevent="$emit('close')"
          >
            Cancel
          </base-button>
        </form>
      </div>
    </template>
  </base-modal>
</template>
<script lang="ts">
import Multiselect from "@vueform/multiselect";
import cloneDeep from "lodash/cloneDeep";
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { CategoryDto, TrackDto } from "@/types";

@Options({
  components: {
    "multi-select": Multiselect
  }
})
export default class EditTrackModal extends Vue {

  @Prop({
    type: Boolean,
    default: false
  })
  isShowing!: boolean;

  @Prop({
    type: Object,
  })
  track?: TrackDto;

  @Prop({
    type: Array
  })
  categories?: CategoryDto[];

  private localTrack: TrackDto = new TrackDto();
  private inSubmission = false;
  private showAlert = false;
  private alertVariant = "nuetralColor";
  private alertMessage = "Please wait while the track info is updated...";

  @Watch("track")
  onTrackChanged(): void {
    if(this.track) {
      this.localTrack = cloneDeep(this.track);
      delete this.localTrack.docID;
    }
  }

  setLocalCategory(value: string): void {
    this.localTrack.category = value;
  }

  async edit(): Promise<void> {
    this.inSubmission = true;
    this.showAlert = true;
    this.alertVariant = "nuetralColor";
    this.alertMessage = "Please wait while the track info is updated...";
    // update the lastUpdated property
    this.localTrack.lastUpdated = new Date().toISOString();

    // TODO: add repository code to update a track in place
    // const success = await this.updateTrack({
    //   id: this.track.docID,
    //   track: this.localTrack
    // });

    // if (success) {
    //   this.inSubmission = false;
    //   this.alertVariant = "successColor";
    //   this.alertMessage = "Track successfully updated!";
    // } else {
    //   this.inSubmission = false;
    //   this.alertVariant = "errorColor";
    //   this.alertMessage = "Something went wrong! Please try again later.";
    // }
    // TODO: emit to parent?
    // this.editModalShowing = false;
  }

  mounted(): void {
    if (this.track) {
      this.localTrack = cloneDeep(this.track);
    }
  }
}
</script>

<style lang="scss">
.alertMessage {
  font-size: 2rem;
  margin-bottom: 2rem;
}
</style>