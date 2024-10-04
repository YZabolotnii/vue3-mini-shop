import { createRouter, createWebHistory } from 'vue-router'
import DefaultView from '../views/Default.vue'
import SneakersView from '../views/Sneakers.vue'
import FavoritesView from '../views/Favorites.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/sneakers',
      name: 'default',
      component: DefaultView,
      children: [
        {
          path: '/sneakers',
          name: 'default',
          component: SneakersView,
          meta: {
            pageTitle: "Головна",
          },
        },
        {
          path: '/sneakers/favorites',
          name: 'favorites',
          component: FavoritesView,
          meta: {
            pageTitle: "Головна",
          },
        }
      ]
    },
  ]
})

export default router
