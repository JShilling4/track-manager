<script setup lang="ts">
import Multiselect from "@vueform/multiselect";
import { tracksRepository } from "../repositories/tracksRepository";
import cloneDeep from "lodash/cloneDeep";
import FormLabel from "./FormLabel.vue";
import TextInput from "./TextInput.vue";
import InputGroup from "./InputGroup.vue";
import UploadDropbox from "./UploadDropbox.vue";
import BaseButton from "./BaseButton.vue";
import BaseModal from "./BaseModal.vue";
import { ICategory, ITrack } from "../types";
import { inject, onMounted, ref, watch } from "vue";
import { updateUITrackListKey } from "../symbols";

export type PropTypes = {
  isShowing?: boolean;
  track?: ITrack | null;
  categories: ICategory[];
};

const props = withDefaults(defineProps<PropTypes>(), {
  isShowing: false,
  track: null,
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const updateUITrackList = inject(updateUITrackListKey);

const localTrack = ref<ITrack>({
  id: "",
  artist: "",
  bpm: "",
  category: "",
  key: "",
  length: "0",
  lastUpdated: "",
  modifiedName: "",
  notes: "",
  originalName: "",
  referenceLink: "",
  url: "",
});
const inSubmission = ref<boolean>(false);

watch(
  () => props.track,
  (newVal: ITrack | null) => {
    if (props.track) {
      localTrack.value = cloneDeep(props.track);
      delete localTrack?.value?.docID;
    }
  }
);

function setLocalCategory(value: string): void {
  if (!localTrack.value) return;
  localTrack.value.category = value;
}

async function editTrackInfo(): Promise<void> {
  if (!localTrack.value) return;

  inSubmission.value = true;
  localTrack.value.lastUpdated = new Date().toISOString();

  const success = await tracksRepository.update({
    ...localTrack.value,
    docID: props?.track?.docID,
  });

  if (success) {
    updateUITrackList &&
      updateUITrackList({ ...localTrack.value, docID: props?.track?.docID });
    inSubmission.value = false;
  } else {
    inSubmission.value = false;
  }
  emit("close");
}

function onEdit(track: ITrack): void {
  localTrack.value = track;
  editTrackInfo();
}

onMounted(() => {
  if (props.track) {
    localTrack.value = cloneDeep(props.track);
  }
});
</script>

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
        <form v-if="localTrack" @submit.prevent="editTrackInfo">
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
            <FormLabel>Length (seconds)</FormLabel>
            <TextInput
              type="text"
              name="length"
              v-model="localTrack.length"
              class=""
              placeholder="Enter Length"
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

          <BaseButton type="submit" class="submit-btn"> Submit </BaseButton>

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

<style lang="scss">
.alertMessage {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.submit-btn {
  margin-right: 1rem;
}
</style>
