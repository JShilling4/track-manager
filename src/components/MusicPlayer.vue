<template>
  <div class="player-wrapper">
    <div class="player">
      <!-- Play/Pause Button -->
      <div class="playPause">
        <i
          id="player-play-button"
          @click.prevent="toggleAudio"
          class="fa icon icon--play"
          :class="{ 'fa-play': !playing, 'fa-pause': playing }"
        ></i>
      </div>

      <!-- Current Position -->
      <div class="currentPosition">
        <span class="player-currenttime">{{ seek }}</span>
      </div>

      <!-- Scrub -->
      <div class="player-scrub">
        <div v-if="currentSong.modifiedName" class="track-info">
          <span class="song-title">{{ currentSong.artist }} - </span>
          <span class="song-artist">{{ currentSong.modifiedName }}</span>
        </div>
        <!-- Scrub Container  -->
        <span class="scrub-container" @click.prevent="updateSeek">
          <!-- Player Ball -->
          <span class="playerBall" :style="{ left: playerProgress }">
            <i class="fas fa-circle"></i>
          </span>
          <!-- Player Progress Bar-->
          <span class="scrubBar" :style="{ width: playerProgress }"></span>
        </span>
      </div>

      <!-- Duration -->
      <div class="duration">
        <span class="player-duration">{{ duration }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "MusicPlayer",

  computed: {
    ...mapGetters(["playing"]),
    ...mapState({
      seek: (state) => state.playerVuexModule.seek,
      duration: (state) => state.playerVuexModule.duration,
      playerProgress: (state) => state.playerVuexModule.playerProgress,
      currentSong: (state) => state.playerVuexModule.currentSong,
    }),
  },

  methods: {
    ...mapActions(["toggleAudio", "updateSeek"]),
  },
};
</script>

<style lang="scss" scoped>
.player-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 20px;
  text-align: left;
  width: 100%;
  height: 64px;

  .player {
    position: relative;
  }

  .playPause {
    width: 28px;
    height: 28px;
    float: left;
  }

  .currentPosition {
    float: left;
    height: 28px;
    color: var(--color-gray);
    margin-left: 20px;
    margin-top: 4px;
  }

  .player-scrub {
    width: calc(100% - 25rem);
    float: left;
    height: 28px;
    margin-left: 28px;
    margin-top: 8px;
    line-height: 12px;
    @include breakpoint(tablet-land) {
      width: calc(100% - 20rem);
    }

    .scrub-container {
      position: relative;
      display: block;
      width: 100%;
      height: 8px;
      line-height: 12px;
      border-radius: 4px;
      margin: 8px 4px 4px;
      background-color: var(--color-gray);
      cursor: pointer;

      .playerBall {
        position: absolute;
        font-size: 26px;
        line-height: 28px;
        height: 28px;
        top: -8px;
        color: rgb(243, 130, 24);
      }

      .scrubBar {
        //block h-2 rounded bg-gradient-to-r from-green-500 to-green-400
        display: block;
        height: 8px;
        border-radius: 2rem;
        background: linear-gradient(to right, #10b981, #10b981);
      }
    }
    .track-info {
      position: absolute;
      color: #fff;

      top: 12px;
      left: 0;
      right: 0;
      text-align: center;
      margin: -24px auto 0;
      width: calc(100% - 25rem);
      @include breakpoint(tablet-land) {
        width: calc(100% - 20rem);
        font-size: 1.2rem;
      }
    }
  }

  .duration {
    float: left;
    height: 28px;
    color: #fff;
    width: 56px;
    margin-left: 32px;
    margin-top: 4px;
  }
}
</style>