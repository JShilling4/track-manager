<template>
  <div class="input-group">
    <slot></slot>
  </div>
</template>

<script>
import { Vue } from "vue-class-component";

export default class InputGroup extends Vue {}
</script>

<style lang="scss" scoped>
.input-group {
  margin-bottom: 2rem;
}
</style>