<template>
  <div class="track-upload">
    <div class="track-upload__header">
      <h2 class="heading">Upload</h2>
      <i class="fas fa-upload icon"></i>
    </div>
    <UploadDropbox />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UploadDropbox from "@/components/UploadDropbox";

@Options({
  components: {
    UploadDropbox
  }
})
export default class TrackUpload extends Vue {}
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