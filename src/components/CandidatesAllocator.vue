<script setup>
import sampleSize from 'lodash.samplesize'
import shuffle from 'lodash.shuffle'
import { computed, ref } from 'vue'

const song = new Audio('/src/assets/Squid Game Sound Effect.mp3')
const shot1 = new Audio('/src/assets/shot.mp3')
const shot2 = new Audio('/src/assets/shot.mp3')
const shot3 = new Audio('/src/assets/shot.mp3')

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
  result.value = sampleSize(elegibleCandidates.value, outputAmount.value)

  await shot1.play()
  await waitForAnimation(Math.random() * 1500)
  await shot2.play()
  await waitForAnimation(Math.random() * 1500)
  await shot3.play()

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
        type="checkbox"
        @change="onChangeCandidate"
      />
      <label :for="candidate">{{ candidate }}</label>
    </div>
  </div>

  <div class="actions__container">
    <input type="number" :max="elegibleCandidates.length" v-model.number="outputAmount" >
  
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

<style>
.flip-list-move,
.flip-list-leave-active {
  transition: all 2.66s ease;
}

.flip-list-leave-active {
  transform: translateX(-50px);
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
