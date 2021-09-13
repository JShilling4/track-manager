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

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss">
@import "~@/design/scss/variables";
@import "~@/design/scss/base";
@import "~@/design/scss/typography";

.container {
    max-width: 1500px;
    margin: 0 auto;
}

.multiselect {
    --ms-font-size: 1.6rem;
    --ms-option-font-size: 1.4rem;
    height: var(--input-height);
}

.errorColor {
    color: rgb(255, 51, 51);
}
.successColor {
    color: rgb(14, 211, 119);
}
.neutralColor {
    color: rgb(65, 130, 252);
}
</style>
