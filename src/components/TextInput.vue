<template>
  <input
    :type="type"
    :class="[classObject]"
    :style="styleObject"
    :value="modelValue"
    :name="name"
    :id="id"
    @input="$emit('update:modelValue', $event.target.value)"
    :tabindex="tabIndex"
  />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class TextInput extends Vue {
  @Prop({
    type: String,
    default: "5px"
  })
  borderRadius!: string;

  @Prop({
    type: String,
    default: ""
  })
  classList!: string;

  @Prop({
    type: String
  })
  id?: string;

  @Prop({
    type: Boolean,
    default: false
  })
  isCurrency!: boolean;

  @Prop({
    type: Boolean,
    default: false
  })
  isPercentage!: boolean;

  @Prop({
    type: String
  })
  name?: string;

  @Prop({
    type: String,
    default: "text"
  })
  type!: string;

  @Prop({
    type: String,
    default: "0"
  })
  tabIndex!: string;

  @Prop({
    type: String,
    default: "100%"
  })
  width!: string;

  @Prop({
    type: String,
    default: "left"
  })
  textAlign!: string;

  @Prop({
    type: String,
    default: "dark"
  })
  theme!: string;

  @Prop({
    type: String,
    default: "dark",
    validator: (val: string | null) => typeof val === "string" || val === null,
    required: true
  })
  modelValue!: string;

  private styleObject = {
    borderRadius: this.borderRadius,
    width: this.width,
    textAlign: this.textAlign
  };

  private classObject = {
    hasIcon: this.isCurrency || this.isPercentage,
    light: this.theme == "light",
    dark: this.theme === "dark"
  };
}
</script>

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
    margin: 0;
  }
  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
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