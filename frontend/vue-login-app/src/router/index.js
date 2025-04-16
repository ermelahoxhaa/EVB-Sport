import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/LoginComponent.vue'
import SignUp from '../components/SignUp.vue'

const routes = [
  { path: '/login', name: 'Login', component: LoginComponent },
  { path: '/signup', name: 'Signup', component: SignUp }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
