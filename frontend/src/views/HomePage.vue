<template>
  <div>
    <AppHeader />

    <!-- 1. Hero Section -->
    <section
      class="hero-banner position-relative d-flex align-items-center justify-content-center text-center text-white"
      :style="`background-image: url('${heroImage}')`"
    >
      <div class="overlay position-absolute top-0 start-0 w-100 h-100"></div>
      <div class="content position-relative z-2">
        <h1 class="display-3 fw-bold mb-4">EVB Sport-Wear</h1>
        <div class="d-flex flex-wrap gap-3 justify-content-center">
          <button class="btn btn-outline-light px-4 py-2" @click="goToProducts">Shop Now</button>
        </div>
      </div>
    </section>

    <!-- 2. TEKSTI - ME QIT NTABEL -->
    <section class="text-section py-5">
      <div class="container text-center">
        <h2 class="mb-4">Welcome to EVB Sport-Wear</h2>
        <p class="lead mb-4">
          Your ultimate destination for premium sports equipment and athletic wear. 
          We provide high-quality products for athletes and fitness enthusiasts who demand the best.
        </p>
        <p>
          From professional gear to everyday workout essentials, discover our extensive collection 
          designed to enhance your performance and style.
        </p>
      </div>
    </section>

    <!-- 3. SliderE -->
    <section class="slider-section">
      <div class="slider">
        <div class="slide" :class="{ active: currentSlide === 0 }">
          <img :src="slider1" alt="Sports Collection" />
        </div>
        <div class="slide" :class="{ active: currentSlide === 1 }">
          <img :src="slider2" alt="Athletic Gear" />
        </div>
        
        <!-- Dots -->
        <div class="dots">
          <span class="dot" :class="{ active: currentSlide === 0 }" @click="currentSlide = 0"></span>
          <span class="dot" :class="{ active: currentSlide === 1 }" @click="currentSlide = 1"></span>
        </div>
      </div>
    </section>

    <!-- 4. Products -->
    <section class="container py-5">
      <h2 class="text-center mb-5">Our Products</h2>
      <ProductList />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import ProductList from '../components/ProductList.vue'

// merri fotot e sliderit dhe hero image
import heroImage from '@/assets/images/homeimage.jpg'
import slider1 from '@/assets/images/slider1.avif'
import slider2 from '@/assets/images/slider2.avif'

// logjika e sliderit
const currentSlide = ref(0)
let interval = null

// slidet ndrrohen automatikisht
const startSlider = () => {
  interval = setInterval(() => {
    currentSlide.value = currentSlide.value === 0 ? 1 : 0
  }, 4000)
}

onMounted(() => {
  startSlider()
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
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

.text-section {
  background-color: #f8f9fa;
}

/* slider */
.slider-section {
  height: 400px;
  position: relative;
  overflow: hidden;
}

.slider {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease;
}

.slide.active {
  opacity: 1;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot.active {
  background-color: white;
}

.dot:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .hero-banner {
    height: 60vh;
  }
  
  .slider-section {
    height: 300px;
  }
}
</style>
