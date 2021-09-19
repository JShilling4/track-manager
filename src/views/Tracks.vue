<template>
    <section class="page-wrapper container">
        <div class="content">
            <!-- Upload Area -->
            <div class="upload-container">
                <track-upload />
            </div>

            <!-- Uploaded List -->
            <div class="mainList-container">
                <div class="categoryFilter">
                    <multi-select
                        name="category"
                        label="name"
                        value-prop="name"
                        v-model="selectedCategory"
                        :options="categoriesFilterList"
                        placeholder="Enter Category"
                    />
                </div>
                <div class="mainList">
                    <!-- Header -->
                    <div class="mainList__header">
                        <h2 class="heading">{{ selectedCategory }} ({{ selectedTracks.length }})</h2>
                    </div>

                    <!-- List Items -->
                    <div class="mainList__item-container">
                        <div
                            v-for="(track) in selectedTracks"
                            :key="track.docID"
                            class="track-container"
                        >
                            <track-item :track="track" />
                            <hr />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from "vuex";
import TrackItem from "@/components/TrackItem.vue";
import TrackUpload from "@/components/TrackUpload.vue";
import Multiselect from "@vueform/multiselect";

export default {
    name: "TracksPage",
    components: {
        "track-upload": TrackUpload,
        "track-item": TrackItem,
        "multi-select": Multiselect,
    },

    data() {
        return {
            selectedCategory: "All",
        };
    },

    computed: {
        ...mapState({
            categories: (state) => state.categories.categories,
            tracks: (state) => state.tracks.tracks,
        }),
        categoriesFilterList() {
            let list = this.categories.map((category) => {
                return category.name;
            });
            list.push("All");
            return list;
        },
        selectedTracks() {
            return this.selectedCategory === "All"
                ? this.tracks
                : this.tracks.filter(
                      (track) => track.category === this.selectedCategory
                  );
        },
    },

    methods: {},
};
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    padding-bottom: 8rem;
}

.upload-container {
    width: 30%;
}

.mainList-container {
    flex: 1;
    margin-left: 12rem;
    .categoryFilter {
        margin-bottom: 2rem;
        width: 25rem;
    }
    .mainList {
        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 2rem;
            font-weight: bold;
            border: 2px solid gray;
        }

        &__item-container {
            padding: 1rem;
            .emptyCategory {
                padding: 2rem 1rem;
            }
        }
    }
}
</style>