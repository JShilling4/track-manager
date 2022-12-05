<script setup lang="ts">
import { CSSProperties, ref } from "vue";

// props
export type PropTypes = {
  bgColor?: string;
  border?: string;
  borderRadius?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  minWidth?: string;
  padding?: string;
  showHoverEffect?: boolean;
  showShadow?: boolean;
  dropShadow?: string;
};

const props = withDefaults(defineProps<PropTypes>(), {
  bgColor: "button-primary-bgcolor",
  border: "#fff",
  borderRadius: "30px",
  color: "button-primary-color",
  fontSize: "16px",
  fontWeight: "bold",
  minWidth: "180px",
  padding: "14px 0",
  showHoverEffect: true,
  showShadow: false,
  dropShadow: "0 13px 15px -13px rgb(242, 95, 58)",
});

// data
const styleObject: CSSProperties = {
  backgroundColor: `var(--${props.bgColor})`,
  border: props.border,
  borderRadius: props.borderRadius,
  boxShadow: props.showShadow ? `var(--${props.dropShadow})` : "",
  color: `var(--${props.color})`,
  fontSize: props.fontSize,
  fontWeight: props.fontWeight as "bold" | "normal",
  minWidth: props.minWidth,
  padding: props.padding,
};
const isHovering = ref<boolean>(false);
</script>

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
