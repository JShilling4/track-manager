<template>
    <div class="input-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "InputGroup"
    }
</script>

<style lang="scss" scoped>
.input-group {
    margin-bottom: 2rem;
}
</style>