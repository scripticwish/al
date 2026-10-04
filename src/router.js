import { createRouter, createWebHashHistory } from 'vue-router'

// Import components
import Home from './views/Home.vue'
import Coaches from './views/Coaches.vue'
import CoachProfile from './views/CoachProfile.vue'
import Schedule from './views/Schedule.vue'
import Booking from './views/Booking.vue'
import Prices from './views/Prices.vue'
import Shop from './views/Shop.vue'
import Reviews from './views/Reviews.vue'
import Contacts from './views/Contacts.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/coaches',
    name: 'Coaches',
    component: Coaches
  },
  {
    path: '/coach/:name',
    name: 'CoachProfile',
    component: CoachProfile,
    props: true
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/booking',
    name: 'Booking',
    component: Booking
  },
  {
    path: '/prices',
    name: 'Prices',
    component: Prices
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: Reviews
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})

export default router