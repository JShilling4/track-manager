<template>
    <div class="page-wrapper container">
        <h2>List Management</h2>

        <form @submit.prevent="addCategory">
            <input-group>
                <form-label>Add Category</form-label>
                <text-input v-model="localCategory.name" />
            </input-group>

            <base-button type="submit">
                Submit
            </base-button>
        </form>
    </div>
</template>

<script>
// import Multiselect from "@vueform/multiselect";
import { categoriesCollection } from "@/includes/firebase";

export default {
    name: "Lists",
    components: {
        // "multi-select": Multiselect,
    },

    data() {
        return {
            categories: [],
            localCategory: {},
        };
    },
    methods: {
        updateCategory(i, values) {
            this.categories[i].name = values.name;
        },

        async addCategory() {
            const category = {
                name: this.localCategory.name,
            }

            await categoriesCollection.add(category);

            this.getCategories();
            this.localCategory = {};
        },

        removeCategory(i) {
            this.categories.splice(i, 1);
        },

        async getCategories() {
            const snapshots = await categoriesCollection.get();

            this.categories = [];

            snapshots.forEach((document) => {
                this.categories.push({
                    docID: document.id,
                    ...document.data(),
                });
            });
        }
    },

    async created() {
        this.getCategories();
    },
};
</script>

<style lang="scss" scoped>
</style>