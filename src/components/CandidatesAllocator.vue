<script setup>
import sampleSize from 'lodash.samplesize'
import shuffle from 'lodash.shuffle'
import { computed, ref } from 'vue'

import songSound from '../assets/Squid Game Sound Effect.mp3'
import shotSound from '../assets/shot.mp3'

const MAX = 1500
const MIN = 100

const song = new Audio(songSound)

const disableButton = ref(false)
const candidates = ref({
  'Brayam': true,
  'Carlos': true,
  'Germán': true,
  'Javi': true,
  'JuanFra': true,
  'Quim': true
})

const elegibleCandidates = computed(() => {
  return Object.keys(candidates.value).filter((candidate) => {
    return candidates.value[candidate]
  })
})

const outputAmount = ref(3)
const result = ref([])

async function onClickGetParticipants () {
  disableButton.value = true

  await song.play()

  result.value = shuffle(elegibleCandidates.value)
  
  await waitForAnimation()
  result.value = shuffle(elegibleCandidates.value)
  
  await waitForAnimation()
  result.value = shuffle(elegibleCandidates.value)
  
  await waitForAnimation()

  while (result.value.length > outputAmount.value) {
    const shot = new Audio(shotSound)

    result.value.splice(Math.floor(Math.random() * result.value.length), 1)
    await shot.play()

    if (result.value.length !== outputAmount.value) {
      const duration = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN
      await waitForAnimation(duration)
    }
  }

  disableButton.value = false
}

function onChangeCandidate () {
  const candidatesLength = elegibleCandidates.value.length
  const numberIsHigher = outputAmount.value > candidatesLength

  outputAmount.value = numberIsHigher ? candidatesLength : outputAmount.value
  result.value = []
}

function waitForAnimation (delay = 2660) {
  return new Promise((resolve) => setTimeout(() => resolve(), delay))
}
</script>

<template>
  <h2>Candidates</h2>
  <div class="candidates__container">
    <div v-for="(index, candidate) in candidates" :key="`${candidate}=${index}`">
      <input 
        v-model="candidates[candidate]"
        :id="candidate"
        :disabled="disableButton"
        type="checkbox"
        @change="onChangeCandidate"
      />
      <label :for="candidate">{{ candidate }}</label>
    </div>
  </div>

  <div class="actions__container">
    <input 
      type="number"
      min="0"
      :max="elegibleCandidates.length" 
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
