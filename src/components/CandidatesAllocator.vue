<script>
import { defineComponent } from 'vue'
import shuffle from 'lodash.shuffle'

import songSound from '../assets/Squid Game Sound Effect.mp3'
import shotSound from '../assets/shot.mp3'

const song = new Audio(songSound)

const MAX = 1500
const MIN = 100

export default defineComponent({
  data() {
    return {
      candidates: ['Brayam', 'Carlos', 'Javi', 'JuanFra', 'Quim'],
      disable: false,
      newCandidate: '',
      isRuffleEnded: false,
      baseAnimationTime: 5,
      outputAmount: 3,
    }
  },

  computed: {
    max() {
      return Math.max(this.candidates.length - 1, 0)
    },

    proxyAmount: {
      get() {
        return this.outputAmount
      },
      set(value) {
        this.outputAmount = Math.min(this.max, Math.max(value, 0))
      },
    },

    rotateValue() {
      return `${this.baseAnimationTime}s`
    },

    spinAroundValue() {
      return `${this.baseAnimationTime * this.candidates.length}s`
    },
  },

  methods: {
    addNewCandidate() {
      if (this.candidates.includes(this.newCandidate)) return

      this.candidates.push(this.newCandidate)
      this.newCandidate = ''
    },

    computeDelay(index) {
      const baseDelay = this.baseAnimationTime * this.candidates.length

      return `-${baseDelay / (index + 1)}s`
    },

    async onClickGetParticipants() {
      this.isRuffleEnded = false
      this.disable = true

      await song.play()

      this.candidates = shuffle(this.candidates)

      await this.waitForAnimation()
      this.candidates = shuffle(this.candidates)

      await this.waitForAnimation()
      this.candidates = shuffle(this.candidates)

      await this.waitForAnimation()

      while (this.candidates.length > this.outputAmount) {
        const shot = new Audio(shotSound)

        this.candidates.splice(
          Math.floor(Math.random() * this.candidates.length),
          1
        )
        await shot.play()

        if (this.candidates.length !== this.outputAmount) {
          const duration = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN
          await this.waitForAnimation(duration)
        }
      }

      this.isRuffleEnded = true
      this.disable = false
    },

    onInputOutputAmount(value) {
      this.outputAmount = Math.min(this.max, Math.max(value, 0))
    },

    removeCandidate(candidate) {
      const index = this.candidates.findIndex((c) => c === candidate)
      this.candidates.splice(index, 1)
      this.outputAmount = Math.min(this.max, this.outputAmount)
    },

    resetCandidates() {
      this.candidates = []
    },

    waitForAnimation(delay = 2660) {
      return new Promise((resolve) => setTimeout(() => resolve(), delay))
    },
  },
})
</script>

<template>
  <div class="row justify-between align-start q-mb-md">
    <div class="col text-h4">Candidates</div>

    <div class="col">
      <div class="row q-gutter-x-lg justify-end">
        <q-form class="row q-gutter-x-md" autofocus @submit="addNewCandidate">
          <q-input
            v-model="newCandidate"
            :disable="disable"
            label="Add candidate"
            dense
          />

          <q-btn
            :disable="!newCandidate || disable"
            color="primary"
            dense
            icon="mdi-plus"
            outline
            fab-mini
            type="submit"
          />
        </q-form>

        <q-btn
          :disabled="disable"
          color="primary"
          outline
          @click="resetCandidates"
        >
          Empty Candidates List
        </q-btn>
      </div>
    </div>
  </div>

  <q-separator />

  <div class="row q-gutter-lg q-mt-md">
    <q-input
      v-model="proxyAmount"
      :disable="disable"
      dense
      type="number"
      :max="max"
      label="How many will survive?"
    >
      <template #after>
        <q-btn
          rounded
          size="md"
          :disable="disable || !outputAmount"
          @click="onClickGetParticipants"
        >
          <q-icon name="mdi-circle-outline" />
          <q-icon name="mdi-triangle-outline" />
          <q-icon name="mdi-square-outline" />
        </q-btn>
      </template>
    </q-input>

    <transition-group name="flip-list" tag="ul">
      <li v-for="candidate in candidates" :key="candidate">
        <q-chip
          :disable="disable"
          color="primary"
          removable
          text-color="white"
          @remove="removeCandidate(candidate)"
        >
          {{ candidate }}
        </q-chip>
      </li>
    </transition-group>

    <div class="thumbail-section">
      <div v-if="isRuffleEnded" class="thumbnail-container">
        <div class="box-center"></div>
        <div
          v-for="(candidate, index) in candidates"
          :key="candidate"
          class="item"
          :style="{ animationDelay: computeDelay(index) }"
        >
          <img :src="`${candidate}.jpg`" :alt="candidate" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$translate-size: 50px;

@keyframes spinAround {
  from {
    transform: rotate(0deg) translate(120px) scale(0.7);
  }
  to {
    transform: rotate(360deg) translate(120px) scale(0.7);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.thumbail-section {
  display: grid;
  justify-content: center;
  width: 100%;
}

.thumbnail-container {
  width: 500px;
  max-width: 100%;
  height: 350px;

  display: grid;
  justify-content: center;
  align-content: center;

  & > * {
    grid-column: 1;
    grid-row: 1;
  }
}

.item {
  animation: spinAround v-bind(spinAroundValue) linear infinite;

  img {
    width: 100px;
    animation: rotate v-bind(rotateValue) linear infinite;
  }
}

.flip-list-enter-active {
  position: relative;
  left: -$translate-size;
  opacity: 0.1;
  transition: all 1s ease;
}

.flip-list-enter-to {
  opacity: 1;
  transform: translateX($translate-size);
}

.flip-list-move {
  transition: all 2.66s ease;
}

.flip-list-leave-active {
  transform: translateX($translate-size);
  transition: all 0.3s ease;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
