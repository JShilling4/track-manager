<template>
  <BaseModal
    width="60rem"
    :show="isShowing"
    :show-close-button="false"
    :clickaway="true"
    background-color="#fff"
    @close="$emit('close')"
  >
    <template #body>
      <div>
        <!-- TODO: move this to toast -->
        <!-- Alert Message -->
        <!-- <div
          v-if="showAlert"
          class="alertMessage"
          :class="alertVariant"
        >
          {{ alertMessage }}
        </div> -->

        <form @submit.prevent="editTrackInfo">
          <InputGroup>
            <FormLabel>Name</FormLabel>
            <TextInput
              type="text"
              name="modifiedName"
              v-model="localTrack.modifiedName"
              class=""
              placeholder="Enter Name"
            />
          </InputGroup>

          <InputGroup>
            <FormLabel>Artist</FormLabel>
            <TextInput
              type="text"
              name="artist"
              v-model="localTrack.artist"
              class=""
              placeholder="Enter Artist"
            />
          </InputGroup>

          <InputGroup>
            <FormLabel>Key</FormLabel>
            <TextInput
              type="text"
              name="key"
              v-model="localTrack.key"
              class=""
              placeholder="Enter Key"
            />
          </InputGroup>

          <InputGroup>
            <FormLabel>BPM</FormLabel>
            <TextInput
              type="text"
              name="bpm"
              v-model="localTrack.bpm"
              class=""
              placeholder="Enter Tempo"
            />
          </InputGroup>

          <InputGroup>
            <FormLabel>Category</FormLabel>
            <Multiselect
              name="category"
              label="name"
              value-prop="name"
              v-model="localTrack.category"
              :options="categories"
              placeholder="Enter Category"
              @select="setLocalCategory"
            />
          </InputGroup>

          <InputGroup>
            <FormLabel>Reference Link</FormLabel>
            <TextInput
              type="text"
              name="category"
              v-model="localTrack.referenceLink"
              class=""
              placeholder="Enter Reference Link"
            />
          </InputGroup>

          <InputGroup>
            <FormLabel>Notes</FormLabel>
            <TextInput
              type="text"
              name="category"
              v-model="localTrack.notes"
              class=""
              placeholder="Enter Notes"
            />
          </InputGroup>

          <InputGroup>
            <FormLabel>New Upload</FormLabel>
            <UploadDropbox @edit="onEdit" :track="localTrack" />
          </InputGroup>

          <BaseButton
            type="submit"
            class="submit-btn"
          > Submit </BaseButton>

          <BaseButton
            type="button"
            class=""
            :disabled="inSubmission"
            bg-color="color-tertiary"
            @click.prevent="$emit('close')"
          >
            Close
          </BaseButton>
        </form>
      </div>
    </template>
  </BaseModal>
</template>
<script lang="ts">
import Multiselect from "@vueform/multiselect";
import cloneDeep from "lodash/cloneDeep";
import { Options, Vue } from "vue-class-component";
import { Inject, Prop, Watch } from "vue-property-decorator";
import { CategoryDto, ITracksRepository, TrackDto } from "@/types";
import { inject } from "inversify-props";
import UploadDropbox from "@/components/UploadDropbox";

@Options({
  components: {
    Multiselect,
    UploadDropbox
  },
  emits: ["close"]
})
export default class EditTrackModal extends Vue {
  @inject() tracksRepository!: ITracksRepository;

  @Inject() private updateUITrackList!: (track: TrackDto) => void;

  @Prop({
    type: Boolean,
    default: false
  })
  isShowing!: boolean;

  @Prop({
    type: Object,
    default: new TrackDto()
  })
  track!: TrackDto;

  @Prop({
    type: Array
  })
  categories?: CategoryDto[];

  private localTrack: TrackDto = new TrackDto();
  private inSubmission = false;
  // private showAlert = false;
  // private alertVariant = "nuetralColor";
  // private alertMessage = "Please wait while the track info is updated...";

  @Watch("track")
  onTrackChanged(): void {
    if (this.track) {
      this.localTrack = cloneDeep(this.track);
      delete this.localTrack.docID;
    }
  }

  setLocalCategory(value: string): void {
    this.localTrack.category = value;
  }

  async editTrackInfo(): Promise<void> {
    this.inSubmission = true;
    // this.showAlert = true;
    // this.alertVariant = "nuetralColor";
    // this.alertMessage = "Please wait while the track info is updated...";
    this.localTrack.lastUpdated = new Date().toISOString();

    const success = await this.tracksRepository.update({
      ...this.localTrack,
      docID: this.track.docID
    });

    if (success) {
      this.updateUITrackList({ ...this.localTrack, docID: this.track.docID });
      this.inSubmission = false;
      // this.alertVariant = "successColor";
      // this.alertMessage = "Track successfully updated!";
    } else {
      this.inSubmission = false;
      // this.alertVariant = "errorColor";
      // this.alertMessage = "Something went wrong! Please try again later.";
    }
    this.$emit("close");
  }

  onEdit(track: TrackDto): void {
    this.localTrack = track;
    this.editTrackInfo();
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

.submit-btn {
  margin-right: 1rem;
}
</style>