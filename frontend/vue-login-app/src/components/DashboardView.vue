<template>
  <div class="d-flex flex-column flex-md-row">
    <div class="sidebar-custom p-3 vh-100">
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

    <div class="flex-grow-1 p-4 content-custom">
      <h2 class="mb-4">Welcome to the Admin Dashboard</h2>

      <div class="row mb-5 stats-container">
        <div class="col-12 col-sm-6 col-md-4 mb-3" v-for="stat in stats" :key="stat.title">
          <div class="card shadow-sm border-0 text-center p-3 stat-card h-100">
            <i :class="stat.icon + ' stat-icon'"></i>
            <h5 class="mt-3">{{ stat.title }}</h5>
            <p class="text-muted">{{ stat.value }}</p>
          </div>
        </div>
      </div>

      <div class="weekly-activity">
        <h4>Weekly Activity</h4>
        <canvas id="activityChart" height="200"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

const stats = [
  { title: 'Total Products', value: '120 Products', icon: 'fas fa-box-open' },
  { title: 'Total Messages', value: '78 Messages', icon: 'fas fa-comment-dots' },
  { title: 'Total Users', value: '56 Users', icon: 'fas fa-users' },
];

onMounted(() => {
  const ctx = document.getElementById('activityChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Products Added', 'Messages Received', 'Users Registered'],
      datasets: [{
        data: [30, 20, 15],
        backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(153,102,255,0.2)', 'rgba(255,159,64,0.2)'],
        borderColor: ['rgba(75,192,192,1)', 'rgba(153,102,255,1)', 'rgba(255,159,64,1)'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true
    }
  });
});
</script>

<style scoped>


.sidebar-custom {
  width: 300px;
  background-color: rgb(128, 97, 114);
  color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 0 10px 10px 0;
  overflow: hidden;
}

.content-custom {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.stat-card {
  background-color: #fff;
  border-radius: 6px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  font-size: 40px;
  color: #8f5e70;
}

.weekly-activity {
  max-width: 40%;
  margin-top: 5px;
  border-radius: 10px;
  padding: 10px;

}

canvas {
  max-width: 50% !important;
  height: auto;
}

@media (max-width: 768px) {
  .sidebar-custom {
    width: 120px;
  }

  .content-custom h2 {
    font-size: 20px;
  }

  .stat-card {
    height: 115px;
  }
}

@media (max-width: 480px) {
  .sidebar-custom {
    width: 100%;
    height: auto;
    border-radius: 0;
  }

  .content-custom {
    width: 100%;
    padding: 15px;
  }

  .stat-card {
    height: 100px;
  }

  .weekly-activity {
    padding: 8px;
  }
}
</style>
