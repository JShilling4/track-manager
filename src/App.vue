<template>
  <the-navbar
    class="container"
    :show-mobile-menu="showMobileMenu || windowWidth > 768"
    @open="showMobileMenu = true"
    @close="showMobileMenu = false"
  />
  <router-view />
</template>

<script lang="ts">
import TheNavbar from "@/components/TheNavbar.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    "the-navbar": TheNavbar,

  }
})
export default class App extends Vue {
  private showMobileMenu = false;
  private windowWidth = document.documentElement.clientWidth;

  getWindowWidth(): void {
    this.windowWidth = document.documentElement.clientWidth;
  }

  mounted(): void {
    this.$nextTick(() => {
      window.addEventListener("resize", this.getWindowWidth);
    });
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss">
@import "~@/design/scss/variables";
@import "~@/design/scss/base";
@import "~@/design/scss/typography";

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
  height: 3rem;
  width: 3rem;
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
</style>
