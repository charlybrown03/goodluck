import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'three-amigos',
      path: '/three-amigos',
      component: () => import('../components/CandidatesAllocator.vue'),
      props: {
        initialCandidates: [
          'Adrià',
          'CarlosJ',
          'CarlosM',
          'Diego',
          'Javi',
          'JuanFra',
          'Quim',
        ],
        initialOutputAmount: 3,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'three-amigos' },
    },
  ],
})
