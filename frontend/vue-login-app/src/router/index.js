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
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router
