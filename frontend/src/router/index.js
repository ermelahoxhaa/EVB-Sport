import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../utils/auth'
import LoginComponent from '../components/LoginComponent.vue'
import SignUp from '../components/SignUp.vue'
import DashboardView from '../components/DashboardView.vue';
import ProductList from '../components/ProductList.vue';
import ManageProducts from '../components/ManageProducts.vue';
import CreateAdmin from '../components/CreateAdmin.vue'
import HomePage from '../views/HomePage.vue';
import AboutUs from '../views/AboutUs.vue'; 

const routes = [
  { path: '/login', name: 'Login', component: LoginComponent },
  { path: '/signup', name: 'Signup', component: SignUp },
  { path: '/products', name: 'Products', component: ProductList },
  { path: '/', name: 'Home', component: HomePage },
  { path: '/about', name: 'AboutUs', component: AboutUs },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: DashboardView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  { 
    path: '/manageproducts', 
    name: 'ManageP', 
    component: ManageProducts,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  { 
    path: '/manageadmin', 
    name: 'ManageA', 
    component: CreateAdmin,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!auth.isLoggedIn()) {
      next('/login');
      return;
    }
    
    if (to.meta.requiresAdmin && !auth.isAdmin()) {
      next('/');
      return;
    }
  }
  
  next();
});

export default router
