import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/LoginComponent.vue'
import SignUp from '../components/SignUp.vue'
import DashboardView from '../components/DashboardView.vue';
import ProductList from '../components/ProductList.vue';
import ManageProducts from '../components/ManageProducts.vue';
import CreateAdmin from '../components/CreateAdmin.vue';



const routes = [
  { path: '/login', name: 'Login', component: LoginComponent },
  { path: '/signup', name: 'Signup', component: SignUp },
  { path: '/products', name: 'Products', component: ProductList },
  { path: '/', name: 'home'  },
  { path: '/about', name: 'about'  },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/manageproducts', name: 'ManageP', component: ManageProducts },
  { path: '/manageadmin', name: 'ManageA', component: CreateAdmin }

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
