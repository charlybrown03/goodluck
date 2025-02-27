<script setup>
import { ref } from 'vue'

const open = ref(true)

const routes = [
  {
    label: 'Three Amigos',
    to: '/three-amigos',
  },
  {
    label: 'Restaurant',
    to: '/restaurant',
  },
]
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar class="m-height-64">
        <q-btn
          color="black"
          dense
          flat
          icon="mdi-menu"
          round
          @click="open = !open"
        />

        <q-toolbar-title>Good luck</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer bordered class="fit row" :model-value="open" side="left">
      <q-scroll-area class="fit">
        <q-list>
          <q-item
            v-for="route in routes"
            :key="route.to"
            clickable
            :to="route.to"
            exact
            active-class="bg-black text-white"
          >
            <q-item-section>
              {{ route.label }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view :key="$route.name" />
    </q-page-container>
  </q-layout>
</template>
