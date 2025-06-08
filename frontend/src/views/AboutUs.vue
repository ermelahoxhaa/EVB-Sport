<template>
  <div>
    <AppHeader />

    <section
      class="hero-banner position-relative d-flex align-items-center justify-content-center text-center text-white"
      :style="`background-image: url('${heroImage}')`"
    >
      <div class="overlay position-absolute top-0 start-0 w-100 h-100"></div>

      <div class="content position-relative z-2">
        <h1 class="display-3 fw-bold mb-4">About Us</h1>
        <p class="lead">Learn more about EVB Sport and our mission.</p>
      </div>
    </section>

    <section class="container py-5">
      <div class="about-content">
        <h2 class="text-center mb-4">Who We Are</h2>
        <p class="text-center">
          EVB Sport is dedicated to providing top-notch sports equipment and accessories to athletes and enthusiasts worldwide. Our mission is to empower you to achieve your goals with the best gear available.
        </p>
        <p class="text-center">
          We believe in quality, affordability, and customer satisfaction. Join us on our journey to make sports accessible to everyone.
        </p>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import heroImage from '@/assets/images/aboutus-banner.jpg'; 
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