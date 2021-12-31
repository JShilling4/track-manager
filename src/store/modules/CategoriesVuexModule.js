import { categoriesCollection } from "@/includes/firebase";

export default {
    state: {
        categories: [],
    },
    mutations: {
        ADD_CATEGORY(state, category) {
            state.categories.push(category);
        },

        UPDATE_CATEGORY(state, category) {
            state.categories.push(category);
        },
    },
    actions: {
        async fetchCategories({ state }) {
            const snapshots = await categoriesCollection.get();

            state.categories = [];

            snapshots.forEach((document) => {
                state.categories.push({
                    docID: document.id,
                    ...document.data(),
                });
            });
        },

        updateCategory({ commit }, category) {
            commit("UPDATE_CATEGORY", category);
        },

        async addCategory({ commit }, category) {
            await categoriesCollection.add(category);
            commit("ADD_CATEGORY", category);
        },

        removeCategory(i) {
            this.categories.splice(i, 1);
        },
    },
    getters: {},
};
