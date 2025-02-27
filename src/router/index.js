import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      children: [
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
          name: 'restaurant',
          path: '/restaurant',
          component: () => import('../components/CandidatesAllocator.vue'),
          props: {
            initialCandidates: [
              'Sundown',
              'Smash Burger',
              'Bar Pipa',
              'Tavernicola',
              'Kuletos',
              'Ramen House',
              'Mamma mia',
              'Ugarit',
              'Antonios',
              'Timesburg',
              'Kibuka',
            ],
            initialOutputAmount: 1,
          },
        },
      ],
      component: () => import('../layouts/DefaultLayout.vue'),
      path: '',
      redirect: { name: 'three-amigos' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'three-amigos' },
    },
  ],
})
