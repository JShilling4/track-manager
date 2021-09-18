<template>
    <TheNavbar
        class="container"
        :show-mobile-menu="showMobileMenu || windowWidth > 768"
        @open="showMobileMenu = true"
        @close="showMobileMenu = false"
    />
    <router-view />
</template>

<script>
import { mapActions } from "vuex";
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
        ...mapActions(["fetchCategories", "fetchTracks"]),

        getWindowWidth() {
            this.windowWidth = document.documentElement.clientWidth;
        },
    },

    async created() {
        this.fetchCategories();
        this.fetchTracks();
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
