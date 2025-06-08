<template>
  <div>
    <AppHeader />

    <!-- Hero Section -->
    <section
      class="hero-banner position-relative d-flex align-items-center justify-content-center text-center text-white"
      :style="`background-image: url('${heroImage}')`"
    >
      <div class="overlay position-absolute top-0 start-0 w-100 h-100"></div>

      <div class="content position-relative z-2">
        <h1 class="display-3 fw-bold mb-4">About Us</h1>
        <p class="lead">{{ aboutUs.description }}</p>
      </div>
    </section>

    <!-- Content Section -->
    <section class="container py-5">
      <div class="about-content">
        <h2 class="text-center mb-4">Who We Are</h2>
        <p class="text-center">{{ aboutUs.description }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AppHeader from '../components/AppHeader.vue';
import heroImage from '@/assets/images/aboutus-banner.jpg'; 

const aboutUs = ref({ description: '' });

const fetchAboutUs = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/about-us');
    aboutUs.value = response.data;
  } catch (error) {
    console.error('Failed to fetch About Us data:', error);
  }
};

onMounted(() => {
  fetchAboutUs();
});
</script>

<style scoped>
.hero-banner {
  height: 60vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.content {
  z-index: 2;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
</style>