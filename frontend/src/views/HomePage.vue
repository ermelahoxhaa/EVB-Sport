<template>
  <div>
    <AppHeader />

    <section
      class="hero-banner position-relative d-flex align-items-center justify-content-center text-center text-white"
      :style="`background-image: url('${heroImage}')`"
    >
      <div class="overlay position-absolute top-0 start-0 w-100 h-100"></div>

      <div class="content position-relative z-2">
        <h1 class="display-3 fw-bold mb-4">EVB Sport-Wear</h1>
        <div class="d-flex flex-wrap gap-3 justify-content-center">
          <button class="btn btn-outline-light px-4 py-2">For Her</button>
          <button class="btn btn-outline-light px-4 py-2">Shop Now</button>
        </div>
      </div>
    </section>

    <section class="container py-5">
      <ProductList />
    </section>
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue';
import ProductList from '../components/ProductList.vue';
import heroImage from '@/assets/images/homeimage.jpg';
</script>

<style scoped>
.hero-banner {
  height: 80vh;
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
</style>
