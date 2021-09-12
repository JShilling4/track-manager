<template>
    <button
        :class="['button', { hovering: isHovering && showHoverEffect }]"
        :style="styleObject"
        @mouseover="isHovering = true"
        @mouseleave="isHovering = false"
    >
        <slot>Button</slot>
    </button>
</template>

<script>
export default {
    name: "BaseButton",
    props: {
        backgroundColor: {
            type: String,
            default: "transparent",
        },
        border: {
            type: String,
            default: "1px solid #333",
        },
        borderRadius: {
            type: String,
            default: "30px",
        },
        color: {
            type: String,
            default: "#333",
        },
        fontSize: {
            type: String,
            default: "16px",
        },
        fontWeight: {
            type: String,
            default: "600",
        },
        minWidth: {
            type: String,
            default: "180px",
        },
        padding: {
            type: String,
            default: "14px 0",
        },
        showHoverEffect: {
            type: Boolean,
            default: true,
        },
        showShadow: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            styleObject: {
                backgroundColor: this.transparent,
                border: this.border,
                borderRadius: this.borderRadius,
                boxShadow: this.showShadow
                    ? "0 13px 15px -13px rgb(242, 95, 58)"
                    : "",
                color: this.color,
                fontSize: this.fontSize,
                fontWeight: this.fontWeight,
                minWidth: this.minWidth,
                padding: this.padding,
            },
            isHovering: false,
        };
    },
};
</script>

<style lang="scss" scoped>
.button {
    font-family: "Be Vietnam", sans-serif;
    outline: none;
    letter-spacing: 1px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, letter-spacing 0.3s;
    &.hovering {
        background-color: #333;
        color: #fff !important;
        letter-spacing: 1.4px;
    }
}
</style>