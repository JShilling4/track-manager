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

<script>
export default {
    name: "TextInput",
    props: {
        borderRadius: {
            type: String,
            default: "5px",
        },
        classList: {
            type: String,
            default: "",
        },
        id: {
            type: String,
        },
        isCurrency: {
            type: Boolean,
            default: false,
        },
        isPercentage: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            type: [String],
            validator: (prop) => typeof prop === "string" || prop === null,
        },
        name: {
            type: String,
        },
        type: {
            type: String,
            default: "text",
        },
        tabIndex: {
            type: String,
            default: "0",
        },
        width: {
            type: String,
        },
        textAlign: {
            type: String,
        },
        theme: {
            type: String,
            default: "dark",
        },
    },
    data() {
        return {
            styleObject: {
                borderRadius: this.borderRadius,
                width: this.width,
                textAlign: this.textAlign,
            },

            classObject: {
                hasIcon: this.isCurrency || this.isPercentage,
                light: this.theme == "light",
                dark: this.theme === "dark",
            },
        };
    },
};
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