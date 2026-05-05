import { createRouter, createWebHistory } from 'vue-router'
import CheckIn from '../views/CheckIn.vue'
import Profile from '../views/Profile.vue'
import Help from '../views/Help.vue'
import HealthGuide from '../views/HealthGuide.vue'

const routes = [
  {
    path: '/',
    name: 'CheckIn',
    component: CheckIn
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/health-guide',
    name: 'HealthGuide',
    component: HealthGuide
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
