<template>
    <TheNavbar
        class="outer-container"
        :show-mobile-menu="showMobileMenu || windowWidth > 768"
        @open="showMobileMenu = true"
        @close="showMobileMenu = false"
    />
    <router-view />
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue";

export default {
    components: {
        TheNavbar,
    },
    data() {
        return {
            showMobileMenu: false,
            windowWidth: document.documentElement.clientWidth,
        };
    },
    methods: {
        getWindowWidth() {
            this.windowWidth = document.documentElement.clientWidth;
        },
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener("resize", this.getWindowWidth);
        });
    },
};
</script>

<style lang="scss">
@import "~@/assets/scss/base";
@import "~@/assets/scss/typography";
</style>
