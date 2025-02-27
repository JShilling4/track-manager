<script setup lang="ts">
import { formatTime } from "../utils";
import { Howl } from "howler";
import type { ITrack } from "../types";
import { computed, ref } from "vue";

// data
const currentSong = ref<ITrack | null>(null);
const sound = ref<Howl | null>(null);
const seek = ref<string>("00:00");
const duration = ref<string>("00:00");
const playerProgress = ref<string>("0%");

// computed
const playing = computed<boolean>(() => {
  if (sound.value?.playing) {
    return sound.value.playing();
  }
  return false;
});

// methods
function toggleAudio(): void {
  if (!sound.value?.playing) {
    return;
  }

  sound.value.playing() ? sound.value.pause() : sound.value.play();
}

function updatePosition(): void {
  if (sound.value) {
    seek.value = formatTime(sound.value.seek());
    duration.value = formatTime(sound.value.duration());
    playerProgress.value = `${
      (sound.value.seek() / sound.value.duration()) * 100
    }%`;
  }
}

function updateSeek(e: MouseEvent): void {
  const element = e.currentTarget as HTMLElement;

  if (!sound.value?.playing()) {
    return;
  }
  const { x, width } = element.getBoundingClientRect();
  const clickX = e.clientX - x;
  const percentage = clickX / width;
  const seconds = sound.value.duration() * percentage;

  sound.value.seek(seconds);
  sound.value.once("seek", () => {
    progress();
  });
}

function newSong(payload: ITrack): void {
  if (sound.value instanceof Howl) {
    sound.value.unload();
  }
  currentSong.value = payload;
  sound.value = new Howl({
    src: [payload.url],
    html5: true,
  });

  if (sound) {
    sound.value.play();
    // update track progress bar as track plays
    sound.value.on("play", () => {
      requestAnimationFrame(() => {
        updatePosition();
        if (sound.value?.playing()) {
          requestAnimationFrame(() => {
            progress();
          });
        }
      });
    });
  }
}

function progress(): void {
  updatePosition();

  if (sound.value?.playing()) {
    requestAnimationFrame(() => {
      progress();
    });
  }
}

function playTrack(): void {
  if (sound.value) {
    sound.value.play();
  }
}

defineExpose({
  newSong,
  playTrack,
});
</script>

<template>
  <div class="player-wrapper">
    <div class="player">
      <!-- Play/Pause Button -->
      <div class="playPause">
        <font-awesome-icon
          id="player-play-button"
          @click.prevent="toggleAudio"
          class="icon icon--play"
          :icon="['fa-solid', playing ? 'fa-pause' : 'fa-play']"
        ></font-awesome-icon>
      </div>
      <!-- Current Position -->
      <div class="currentPosition">
        <span class="player-currenttime">{{ seek }}</span>
      </div>
      <!-- Scrub -->
      <div class="player-scrub">
        <div v-if="currentSong && currentSong.modifiedName" class="track-info">
          <span class="song-title">{{ currentSong.artist }} - </span>
          <span class="song-artist">{{ currentSong.modifiedName }}</span>
        </div>
        <!-- Scrub Container  -->
        <span class="scrub-container" @click.prevent="updateSeek">
          <!-- Player Ball -->
          <span class="playerBall" :style="{ left: playerProgress }">
            <font-awesome-icon
              class="fas fa-circle"
              icon="fa-solid fa-circle"
            ></font-awesome-icon>
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

<style lang="scss" scoped>
@use "../scss/mixins" as *;

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
