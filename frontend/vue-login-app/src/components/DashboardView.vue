<template>
  <div class="d-flex flex-column flex-md-row min-vh-100">
    <!-- Sidebar -->
    <div class="bg-custom sidebar p-3 text-white" style="width: 250px;">
      <h4 class="text-center mb-4">SportWear Admin</h4>
      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <a class="nav-link text-white" href="#"><i class="fas fa-home me-2"></i>Dashboard</a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link text-white" href="#"><i class="fas fa-comment-dots me-2"></i>Manage Messages</a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link text-white" href="#"><i class="fas fa-box-open me-2"></i>Products</a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link text-white" href="#"><i class="fas fa-users me-2"></i>Users</a>
        </li>
        <li class="nav-item mt-4">
          <a class="nav-link text-white" href="#"><i class="fas fa-sign-out-alt me-2"></i>Logout</a>
        </li>
      </ul>
    </div>

    <!-- Content -->
    <div class="flex-fill p-4 bg-light">
      <h2 class="mb-4">Welcome to the Admin Dashboard</h2>

      <!-- Stats Cards -->
      <div class="row mb-4">
        <div
          class="col-12 col-sm-6 col-md-4 mb-3"
          v-for="stat in stats"
          :key="stat.title"
        >
          <div class="card text-center h-100 shadow-sm border-0">
            <div class="card-body">
              <i :class="stat.icon" class="display-6 text-primary mb-2"></i>
              <h5 class="card-title">{{ stat.title }}</h5>
              <p class="card-text text-muted">{{ stat.value }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart -->
      <div class="card shadow-sm p-3">
        <h5 class="card-title">Weekly Activity</h5>
        <canvas id="activityChart" height="200"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Chart from 'chart.js/auto'

const stats = [
  { title: 'Total Products', value: '120 Products', icon: 'fas fa-box-open' },
  { title: 'Total Messages', value: '78 Messages', icon: 'fas fa-comment-dots' },
  { title: 'Total Users', value: '56 Users', icon: 'fas fa-users' }
]

onMounted(() => {
  const ctx = document.getElementById('activityChart').getContext('2d')
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Products Added', 'Messages Received', 'Users Registered'],
      datasets: [
        {
          data: [30, 20, 15],
          backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(153,102,255,0.2)', 'rgba(255,159,64,0.2)'],
          borderColor: ['rgba(75,192,192,1)', 'rgba(153,102,255,1)', 'rgba(255,159,64,1)'],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
})
</script>

<style scoped>
.bg-custom {
  background-color: rgb(128, 97, 114);
}

canvas {
  max-width: 100%;
  height: 300px !important;
}

/* Ruaj strukturën anë-majë edhe në ekran të vogël */
.sidebar {
  width: 250px;
  min-width: 250px;
  background-color: rgb(128, 97, 114);
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
.card-body{
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
