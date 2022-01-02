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

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({})
export default class BaseButton extends Vue {
  @Prop({
    type: String,
    default: "button-primary-bgcolor"
  })
  backgroundColor!: string;

  @Prop({
    type: String,
    default: "#fff"
  })
  border!: string;

  @Prop({
    type: String,
    default: "30px"
  })
  borderRadius!: string;

  @Prop({
    type: String,
    default: "button-primary-color"
  })
  color!: string;

  @Prop({
    type: String,
    default: "16px"
  })
  fontSize!: string;

  @Prop({
    type: String,
    default: "600"
  })
  fontWeight!: string;

  @Prop({
    type: String,
    default: "180px"
  })
  minWidth!: string;

  @Prop({
    type: String,
    default: "14px 0"
  })
  padding!: string;

  @Prop({
    type: Boolean,
    default: true
  })
  showHoverEffect!: boolean;

  @Prop({
    type: Boolean,
    default: false
  })
  showShadow!: boolean;

  @Prop({
    type: String,
    default: "0 13px 15px -13px rgb(242, 95, 58)"
  })
  dropShadow!: string;

  private styleObject = {
    backgroundColor: `var(--${this.backgroundColor})`,
    border: this.border,
    borderRadius: this.borderRadius,
    boxShadow: this.showShadow ? `var(--${this.dropShadow})` : "",
    color: `var(--${this.color})`,
    fontSize: this.fontSize,
    fontWeight: this.fontWeight,
    minWidth: this.minWidth,
    padding: this.padding
  };
  private isHovering = false;
}
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