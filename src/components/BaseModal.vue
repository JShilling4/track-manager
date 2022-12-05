<script setup lang="ts">
import { watch } from "vue";

export type PropTypes = {
  width?: string;
  show: boolean;
  clickaway?: boolean;
  showCloseButton?: boolean;
  isLoading?: boolean;
  isPosting?: boolean;
  classes?: string;
  backgroundColor?: string;
};

const props = withDefaults(defineProps<PropTypes>(), {
  show: false,
  width: "600px",
  clickaway: false,
  showCloseButton: true,
  isLoading: false,
  isPosting: false,
  classes: "",
  backgroundColor: "#fff",
});

const emit = defineEmits<{
  (e: "close"): void;
  (e: "saveProperty"): void;
  (e: "saveAddress"): void;
}>();

watch(
  () => props.show,
  (newVal: boolean) => {
    if (newVal) {
      document.querySelector("body")?.classList.add("overflow-hidden");
    } else {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    }
  }
);

function closeModal(): void {
  emit("close");
  document.querySelector("body")?.classList.remove("overflow-hidden");
}
function clickAway(): void {
  if (props.clickaway) {
    emit("close");
  }
}
</script>

<template>
  <transition name="fade" appear>
    <div class="modal-backdrop" @click="clickAway" v-if="show" />
  </transition>

  <transition name="slide-vertical" appear>
    <div
      class="modal-dialog"
      :style="`width: ${width}; background-color: ${backgroundColor}`"
      v-if="show"
    >
      <div class="modal-header">
        <slot name="header" />
        <button
          v-if="showCloseButton"
          type="button"
          class="modal-close"
          @click="closeModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
            <path
              fill="currentColor"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            ></path>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <slot name="body" />
      </div>

      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  overflow-x: hidden;
  overflow-y: hidden;
  &-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 100;
  }
  &-dialog {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    max-height: 85%;
    overflow-y: auto;
    background-color: #ffffff;
    border-radius: var(--app-border-radius);
    margin: 0 auto;
    padding: 2rem 3rem;
    display: flex;
    flex-direction: column;
    z-index: 100;
    @include breakpoint(mobile) {
      width: 95% !important;
    }
  }
  &-close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    background-color: transparent;
    border: none;
    outline: none;
    width: 15px;
    height: 15px;
    color: var(--gray-ui);
    cursor: pointer;
    &:hover {
      color: var(--orange);
    }
  }
  &-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    // padding: 20px 20px 10px;
  }
  &-body {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 2rem;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-vertical-enter-active,
.slide-vertical-leave-active {
  transition: opacity 0.3s, top 0.3s;
}
.slide-vertical-enter-from,
.slide-vertical-leave-to {
  opacity: 0;
  top: 0;
}
</style>
