<template>
    <section class="page-wrapper container">
        <div class="content">
            <!-- Upload Area -->
            <div class="upload-container">
                <track-upload :add-song="addTrack" />
            </div>

            <!-- Uploaded List -->
            <div class="mainList-container">
                <div class="mainList">
                    <!-- Header -->
                    <div class="mainList__header">
                        <h2 class="heading">All Tracks</h2>
                        <i class="fa fa-compact-disc icon"></i>
                    </div>

                    <!-- List Items -->
                    <div class="mainList__item-container">
                        <track-item
                            v-for="(track, i) in tracks"
                            :key="track.docID"
                            :track="track"
                            :update-track="updateTrack"
                            :index="i"
                            :remove-track="removeTrack"
                            :update-unsaved-flag="updateUnsavedFlag"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import TrackItem from "@/components/TrackItem.vue";
import TrackUpload from "@/components/TrackUpload.vue";
import { tracksCollection } from "@/includes/firebase";

export default {
    name: "ManagePage",
    components: {
        "track-upload": TrackUpload,
        "track-item": TrackItem,
    },
    data() {
        return {
            tracks: [],
            unsavedFlag: false,
        };
    },
    methods: {
        updateTrack(i, values) {
            this.tracks[i].modifiedName = values.modifiedName;
            this.tracks[i].genre = values.genre;
        },
        removeTrack(i) {
            this.tracks.splice(i, 1);
        },
        addTrack(document) {
            const track = {
                ...document.data(),
                docID: document.id,
            };

            this.tracks.push(track);
        },
        updateUnsavedFlag(value) {
            this.unsavedFlag = value;
        }
    },
    async created() {
        const snapshots = await tracksCollection.get();
        snapshots.forEach((document) => this.addTrack(document));
    },
    beforeRouteLeave(to, from, next) {
        if(!this.unsavedFlag) {
            next();
        } else {
            const leave = confirm("You have unsaved changes. Are you sure you want to leave?");
            next(leave);
        }
    }
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
    margin-left: 4rem;

    .mainList {
        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .5rem 2rem;
            font-weight: bold;
            border: 2px solid gray;
            .icon {
                color: teal;
                font-size: 2rem;
            }
        }

        &__item-container {
            padding: 1rem;
        }
    }
}
</style>