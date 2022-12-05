<script setup lang="ts">
import { CSSProperties } from "vue";

export type PropTypes = {
  modelValue: string;
  borderRadius?: string;
  classList?: string;
  isCurrency?: boolean;
  isPercentage?: boolean;
  tabIndex?: string;
  width?: string;
  textAlign?: string;
  theme?: string;
};

const props = withDefaults(defineProps<PropTypes>(), {
  borderRadius: "5px",
  classList: "",
  isCurrency: false,
  isPercentage: false,
  tabIndex: "0",
  width: "100%",
  textAlign: "left",
  theme: "dark",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const styleObject: CSSProperties = {
  borderRadius: props.borderRadius,
  width: props.width,
  textAlign: props.textAlign as "left" | "right" | "center",
};

const classObject = {
  hasIcon: props.isCurrency || props.isPercentage,
  light: props.theme == "light",
  dark: props.theme === "dark",
};

function handleInput(e: Event): void {
  const value = (e.target as HTMLInputElement).value;
  emit("update:modelValue", value);
}
</script>

<template>
  <input
    :class="[classObject]"
    :style="styleObject"
    :value="modelValue"
    @input="handleInput"
    :tabindex="tabIndex"
  />
</template>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
  width: 100%;
}
input {
  height: var(--input-height);
  outline: none;
  padding: 0.5rem 1rem 0.5rem;
  border: 1px solid var(--input-border-color);
  width: 100%;
  font-size: 16px;
  background-color: #fff;
  color: #333;
  &:focus {
    border-color: var(--teal);
    box-shadow: var(--input-focused-border-shadow);
  }

  &.short {
    width: 7rem;
  }
  &.hasIcon {
    padding-left: 2.5rem;
  }
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
    &.hasIcon {
      padding: 0.5rem 1rem 0.5rem 2.25rem;
    }
  }
  &::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: var(--input-placeholder-color);
  }
  &::-moz-placeholder {
    /* Firefox 19+ */
    color: var(--input-placeholder-color);
  }
  &:-ms-input-placeholder {
    /* IE 10+ */
    color: var(--input-placeholder-color);
  }
  &:-moz-placeholder {
    /* Firefox 18- */
    color: var(--input-placeholder-color);
  }
}
</style>
