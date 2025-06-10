<template>
  <div class="container-fluid min-vh-100">
    <div class="row flex-nowrap">
      <nav
        class="col-auto col-md-3 col-xl-2 px-3 bg-custom sidebar text-white d-flex flex-column"
        style="min-height: 100vh;"
      >
        <h5 class="text-center my-4"><i>SportWear Admin</i></h5>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item mb-2">
            <router-link to="/dashboard" class="nav-link text-white" active-class="active">
              <i class="fas fa-home me-2"></i>Dashboard
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link to="/manageproducts" class="nav-link text-white" active-class="active">
              <i class="fas fa-box-open me-2"></i>Manage Products
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link to="/manageadmin" class="nav-link text-white" active-class="active">
              <i class="fas fa-users me-2"></i>Manage Users
            </router-link>
          </li>
          <li class="nav-item mt-auto">
            <a class="nav-link text-white" href="#" @click="handleLogout">
              <i class="fas fa-sign-out-alt me-2"></i>Logout
            </a>
          </li>
        </ul>
      </nav>
      <main class="col py-4 bg-light" style="overflow-x:auto;">
        <h2 class="mb-4">Welcome to the Admin Dashboard</h2>
        <div class="row mb-4">
          <div
            class="col-12 col-sm-6 col-md-4 mb-3"
            v-for="stat in stats"
            :key="stat.title"
          >
            <div class="card text-center h-100 shadow-sm border-0">
              <div class="card-body d-flex flex-column align-items-center">
              <div class="mb-2 d-flex justify-content-center gap-2">
              <template v-if="stat.title === 'Total Products'">
                 <i class="fas fa-shopping-cart stat-icon"></i>
              </template>
              <template v-else-if="stat.title === 'Total Users'">
                 <i class="fas fa-user stat-icon"></i>
              </template>
              <template v-else-if="stat.title === 'Total Orders'">
  <i class="fas fa-shopping-bag stat-icon"></i>
</template>
           </div>      
                <h5 class="card-title">{{ stat.title }}</h5>
                <p class="card-text text-muted">{{ stat.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card shadow-sm p-3">
          <h5 class="card-title">Weekly Activity</h5>
          <canvas id="activityChart" height="200"></canvas>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'
import axios from 'axios'
import { useRouter } from 'vue-router';
import { auth } from '../utils/auth';

const router = useRouter();
const stats = ref({
  totalProducts: 0,
  totalUsers: 0,
  totalOrders: 0
})
let chartInstance = null

const handleLogout = async () => {
  try {
    await auth.logout();
    router.push('/login');
  } catch (error) {
    console.error('Logout error:', error);
    router.push('/login');
  }
};

const fetchStats = async () => {
  try {
    const token = auth.getToken()
    const [productsRes, usersRes, ordersRes] = await Promise.all([
      axios.get('http://localhost:3000/api/products', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      axios.get('http://localhost:3000/api/users', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      axios.get('http://localhost:3000/api/orders', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    ])

    stats.value = {
      totalProducts: productsRes.data.length,
      totalUsers: usersRes.data.length,
      totalOrders: ordersRes.data.length
    }

    updateChart(productsRes.data.length, usersRes.data.length, ordersRes.data.length);
  } catch (error) {
    console.error('Error fetching stats:', error);
    if (error.response?.status === 403) {
      await auth.logout();
      router.push('/login');
    }
  }
};

const updateChart = (productCount, userCount, orderCount) => {
  const ctx = document.getElementById('activityChart').getContext('2d')

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Products Added', 'Users Registered', 'Orders Placed'],
      datasets: [
        {
          data: [productCount, userCount, orderCount],
          backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(255,159,64,0.2)', 'rgba(153,102,255,0.2)'],
          borderColor: ['rgba(75,192,192,1)', 'rgba(255,159,64,1)', 'rgba(153,102,255,1)'],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
}

onMounted(() => {
  if (!auth.isAdmin()) {
    router.push('/')
    return
  }
  fetchStats()

  window.addEventListener('popstate', () => {
    if (auth.isAdmin()) {
      router.push('/dashboard')
    }
  })
})

watch(() => router.currentRoute.value.path, (newPath) => {
  if (auth.isAdmin() && newPath !== '/dashboard') {
    router.push('/dashboard')
  }
})
</script>

<style scoped>
.text-vjollce {
  color: rgb(128, 97, 114); 
}

.bg-custom {
  background-color: rgb(128, 97, 114);
}

canvas {
  max-width: 100%;
  height: 300px !important;
}

.sidebar {
  width: 250px;
  min-width: 250px;
  background-color: rgb(128, 97, 114);
}
.sidebar .nav-link {
    margin-bottom: 20px;
    font-size: 17px;
  }
  .sidebar .nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.25rem;
}
.stat-icon {
  font-size: 1.5rem; 
  color: rgb(128, 97, 114);
  margin-bottom: 10px;
}


@media (max-width: 768px) {
  .sidebar {
    width: 80px;
    font-size: 14px;
  }

  .sidebar .nav-link {
    font-size: 12px;
    padding: 0.4rem 0.5rem;
  }

  .flex-fill {
    padding: 1rem !important;
  }

  h2, h5 {
    font-size: 18px;
  }

  .card-body {
    flex-direction: column;
  }

  .card-title {
    font-size: 12px;
  }

  .card-text {
    font-size: 10px;
  }

  .display-6 {
    font-size: 1.0rem;
  }
}
</style>
