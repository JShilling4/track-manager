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
            default: "button-primary-bgcolor",
        },
        border: {
            type: String,
            default: "#fff",
        },
        borderRadius: {
            type: String,
            default: "30px",
        },
        color: {
            type: String,
            default: "button-primary-color",
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
            default: false,
        },
        dropShadow: {
            type: String,
            default: "0 13px 15px -13px rgb(242, 95, 58)"
        }
    },
    data() {
        return {
            styleObject: {
                backgroundColor: `var(--${this.backgroundColor})`,
                border: this.border,
                borderRadius: this.borderRadius,
                boxShadow: this.showShadow
                    ? `var(--${this.dropShadow})`
                    : "",
                color: `var(--${this.color})`,
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