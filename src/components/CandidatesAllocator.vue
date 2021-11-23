<script>
import { defineComponent } from 'vue'
import shuffle from 'lodash.shuffle'

import songSound from '../assets/Squid Game Sound Effect.mp3'
import shotSound from '../assets/shot.mp3'

const song = new Audio(songSound)

const MAX = 1500
const MIN = 100

export default defineComponent({
  data () {
    return {
      candidates: [
        'Brayam',
        'Carlos',
        'Germán',
        'Javi',
        'JuanFra',
        'Quim'
      ],
      disableButton: false,
      newCandidate: '',
      outputAmount: 3,
      result: []
    }
  },

  computed: {
    max () {
      if (this.candidates.length === 0) return 0

      return this.candidates.length - 1
    }
  },

  watch: {
    candidates: {
      deep: true,
      handler () {
        this.outputAmount = Math.min(this.max, this.outputAmount)
        this.result = []
      }
    }
  },

  methods: {
    addNewCandidate () {
      if (this.candidates.includes(this.newCandidate)) return

      this.candidates.push(this.newCandidate)
      this.newCandidate = ''
    },

    async onClickGetParticipants () {
      this.disableButton = true

      await song.play()

      this.result = shuffle(this.candidates)
      
      await this.waitForAnimation()
      this.result = shuffle(this.candidates)
      
      await this.waitForAnimation()
      this.result = shuffle(this.candidates)
      
      await this.waitForAnimation()

      while (this.result.length > this.outputAmount) {
        const shot = new Audio(shotSound)

        this.result.splice(Math.floor(Math.random() * this.result.length), 1)
        await shot.play()

        if (this.result.length !== this.outputAmount) {
          const duration = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN
          await this.waitForAnimation(duration)
        }
      }

      this.disableButton = false
    },

    removeCandidate (candidate) {
      const index = this.candidates.findIndex(c => c === candidate)
      this.candidates.splice(index, 1)
    },

    resetCandidates () {
      this.candidates = []
    },

    waitForAnimation (delay = 2660) {
      return new Promise((resolve) => setTimeout(() => resolve(), delay))
    }
  }
})
</script>

<template>
  <h2>Candidates</h2>
  <div class="row mb-1">
    <div>
      <input type="text" v-model="newCandidate">
      <button :disabled="!newCandidate || disableButton" @click="addNewCandidate">Add new candidate</button>
    </div>
    
    <button @click="resetCandidates" :disabled="disableButton">Reset all candidates</button>
  </div>

  <div class="candidates__container">
    <div v-for="(candidate, index) in candidates" :key="`${candidate}-${index}`" class="row">
      <span>{{ candidate }}</span>
      <button @click="removeCandidate(candidate)" :disabled="disableButton">X</button>
    </div>
  </div>

  <div class="actions__container">
    <input 
      type="number"
      min="0"
      :max="max"
      v-model.number="outputAmount"
    >
  
    <button 
      :disabled="disableButton"
      @click="onClickGetParticipants"
    >
      Get candidates!
    </button>
  </div>


  <transition-group 
    name="flip-list"
    tag="ul"
  >
    <li 
      v-for="(participant, index) in result"
      :key="participant"
      :data-index="index"
    >
      {{ participant }}
    </li>
  </transition-group>
</template>

<style lang="scss">
$translate-size: 50px;

.row {
  display: flex;
  gap: 0.5rem;
}

.mb-1 {
  margin-bottom: 1rem;
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
  transform: translateX(-$translate-size);
  transition: all 0.3s ease;
}

.candidates__container {
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.actions__container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

input[type="checkbox"],
button {
  cursor: pointer;
}
</style>
