<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import TheNavbar from "./components/TheNavbar.vue";

const isMobileMenuVisible = ref<boolean>(false);
const windowWidth = ref<number>(document.documentElement.clientWidth);

onMounted(() => {
  nextTick(() => {
    window.addEventListener("resize", getWindowWidth);
  });
});

function getWindowWidth() {
  windowWidth.value = document.documentElement.clientWidth;
}
</script>

<template>
  <TheNavbar
    class="container"
    :show-mobile-menu="isMobileMenuVisible || windowWidth > 768"
    @open="isMobileMenuVisible = true"
    @close="isMobileMenuVisible = false"
  />
  <router-view />
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss">
@import "./scss/reset.scss";

.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 2rem;
}

.multiselect {
  --ms-font-size: 1.6rem;
  --ms-option-font-size: 1.4rem;
  --ms-max-height: 18rem;
  height: var(--input-height);
  &-dropdown {
    max-height: 18rem;
  }
}

.errorColor {
  color: rgb(255, 51, 51);
}

.successColor {
  color: rgb(14, 211, 119);
  font-weight: 600;
}

.neutralColor {
  color: rgb(65, 130, 252);
}

.icon {
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  &--delete {
    background-color: var(--color-red);
  }
  &--edit {
    background-color: var(--color-primary);
  }
  &--download {
    background-color: var(--color-download);
  }
  &--play {
    background-color: var(--color-play);
  }
}

.overflow-hidden {
  overflow: hidden;
}
</style>
