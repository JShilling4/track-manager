<template>
    <section class="page-wrapper container">
        <div class="content">
            <!-- Upload Area -->
            <div class="upload-container">
                <track-upload />
            </div>

            <!-- Uploaded List -->
            <div class="mainList-container">
                <div class="mainList">
                    <!-- Header -->
                    <div class="mainList__header">
                        <h2 class="heading">All Tracks ({{ tracks.length }})</h2>
                    </div>

                    <!-- List Items -->
                    <div class="mainList__item-container">
                        <track-item
                            v-for="(track) in tracks"
                            :key="track.docID"
                            :track="track"
                        />
                    </div>
                </div>
                <div
                    v-for="(category) in categories"
                    :key="category.id"
                    class="mainList"
                >
                    <!-- Header -->
                    <div class="mainList__header">
                        <h2 class="heading">
                            {{ category.name }}
                            ({{ tracks.filter((t) => t.category === category.name).length }})
                        </h2>
                    </div>

                    <!-- List Items -->
                    <div class="mainList__item-container">
                        <div
                            v-for="(track) in tracks.filter((t) => t.category === category.name)"
                            :key="track.docID"
                        >
                            <track-item :track="track" />

                        </div>
                        <p
                            v-if="tracks.filter((t) => t.category === category.name).length < 1"
                            class="emptyCategory"
                        >No tracks in this category.</p>
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

export default {
    name: "TracksPage",
    components: {
        "track-upload": TrackUpload,
        "track-item": TrackItem,
    },

    data() {
        return {};
    },

    computed: {
        ...mapState({
            categories: (state) => state.categories.categories,
            tracks: (state) => state.tracks.tracks,
        }),
    },

    methods: {},
};
</script>

<style lang="scss" scoped>
.content {
    display: flex;
}

.upload-container {
    width: 30%;
}

.mainList-container {
    flex: 1;
    margin-left: 12rem;

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