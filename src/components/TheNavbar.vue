<template>
    <header class="header">
        <img
            src="@/assets/images/logo.svg"
            alt="Manage logo"
            class="logo"
        />

        <nav
            v-if="showMobileMenu"
            class="nav"
        >
            <a
                href="#"
                class="nav-item"
            >Link</a>
            <a
                href="#"
                class="nav-item"
            >Link</a>
            <a
                href="#"
                class="nav-item"
            >Link</a>
            <a
                href="#"
                class="nav-item"
            >Link</a>
            <a
                href="#"
                class="nav-item"
            >Link</a>
        </nav>

        <img
            v-if="showMobileMenu"
            src="@/assets/images/icon-close.svg"
            alt="close mobile menu icon"
            @click="$emit('close')"
            class="mobileClose"
        >
        <img
            v-else
            src="@/assets/images/icon-hamburger.svg"
            alt="mobile menu icon"
            @click="$emit('open')"
            class="hamburger"
        >

        <base-button :show-shadow="false">Get Started</base-button>
    </header>
</template>

<script>
export default {
    name: "TheNavbar",
    props: {
        showMobileMenu: {
            type: Boolean,
        },
    },
};
</script>

<style lang="scss" scoped>
.header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 18rem;
    @include breakpoint(tablet-land) {
        min-height: 10rem;
    }
    .logo {
        width: 15rem;
    }
    .nav {
        @include breakpoint(tablet-land) {
            position: absolute;
            display: flex;
            flex-direction: column;
            background-color: #fff;
            width: 85%;
            top: 12rem;
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
            margin: 0 1.85rem;
            font-size: 1.5rem;
            font-weight: 900;
            color: $blue-dark;
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
        }
    }
    button {
        @include breakpoint(laptop) {
            display: none;
        }
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