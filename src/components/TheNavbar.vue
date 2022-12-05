<script setup lang="ts">
export type PropTypes = {
  showMobileMenu?: boolean;
};

const props = withDefaults(defineProps<PropTypes>(), {
  showMobileMenu: false,
});

const emit = defineEmits<{
  (e: "open"): void;
  (e: "close"): void;
}>();

function openMobileMenu() {
  emit("open");
}

function closeMobileMenu() {
  emit("close");
}
</script>

<template>
  <header class="header">
    <div>
      <h1>Set Manager</h1>
    </div>

    <nav v-if="props.showMobileMenu" class="nav">
      <router-link to="/tracks" class="nav-item" @click="closeMobileMenu">
        Tracks
      </router-link>
      <router-link to="/sets" class="nav-item" @click="closeMobileMenu">
        Sets
      </router-link>
    </nav>
    <font-awesome-icon
      v-if="props.showMobileMenu"
      alt="close mobile menu icon"
      @click="closeMobileMenu"
      class="mobileClose"
      icon="fa-solid fa-times"
    >
    </font-awesome-icon>
    <font-awesome-icon
      v-else
      alt="mobile menu icon"
      @click="openMobileMenu"
      class="hamburger"
      icon="fa-solid fa-bars"
    >
    </font-awesome-icon>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 10rem;
  margin-bottom: 3rem;
  @include breakpoint(tablet-land) {
    margin-bottom: 2rem;
  }

  .logo {
    width: 15rem;
  }
  .nav {
    @include breakpoint(tablet-land) {
      position: absolute;
      z-index: 100;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      width: 100%;
      top: 0;
      padding: 4rem 2rem;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
      text-align: center;
    }
    @include breakpoint(mobile) {
      top: 10rem;
    }
    .nav-item {
      position: relative;
      margin: 0 1.85rem;
      font-size: 1.5rem;
      font-weight: 900;
      color: var(--blue-dark);
      transition: color 0.3s;
      @include breakpoint(tablet-land) {
        margin: 0;
        padding: 1.5rem 0;
        font-weight: 600;
        font-size: 2.3rem;
      }
      @include breakpoint(mobile) {
        font-size: 1.8rem;
      }
      &:hover {
        color: lighten(#333, 40%);
      }
      &.router-link-active:after {
        position: absolute;
        left: 0;
        bottom: -0.5rem;
        content: "";
        height: 2px;
        width: 100%;
        background-color: var(--color-primary);
        @include breakpoint(tablet-land) {
          width: 50%;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
        }
      }
    }
  }
  button {
    @include breakpoint(laptop) {
      display: none;
    }
  }
  .hamburger,
  .mobileClose {
    font-size: 3rem;
    z-index: 101;
  }
  .hamburger {
    display: none;
    @include breakpoint(ipadPro) {
      display: block;
    }
  }
  .mobileClose {
    @media screen and (min-width: 768px) {
      display: none;
    }
  }
}
</style>
