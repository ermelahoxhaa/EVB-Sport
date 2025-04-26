<template>
  <div class="custom-body">
  <div class="container">
    <div class="sport-wear row justify-content-between align-items-start">
      <div class="col-12 col-md-4 mb-3 brand-selector">
        <select class="form-select" v-model="selectedBrand">
          <option value="">All Brands</option>
          <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
        </select>
      </div>

      <div class="col-12 col-md-6 mb-3 search">
        <input type="text" v-model="searchQuery" class="form-control me-2" placeholder="Search products..." />
        <button class="btn btn-dark" @click="search">Search</button>
      </div>
    </div>

    <section id="products" class="mt-4">
      <div class="product-list">
        <div v-for="product in filteredProducts" :key="product.id" class="product-item">
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p class="price">{{ product.price }}</p>
          <button class="btn">Add to cart</button>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'

import nikeHoodie from '@/assets/nike-hoodie.jpg'
import adidasShorts from '@/assets/adidas-shorts.jpg'
import pumaTShirt from '@/assets/puma-t-shirt.jpg'
import underArmourTankTop from '@/assets/under-armour-tank-top.jpg'
import reebokSneakers from '@/assets/reebok-sneakers.jpg'
import nikeAirMax270 from '@/assets/nike-air-max-270.jpg'
import adidasUltraboost22 from '@/assets/adidas-ultraboost-22.jpg'
import pumaCaliStar from '@/assets/puma-cali-star.jpg'
import uaFavoriteHat from '@/assets/ua-favorite-hat.jpg'
import reebokLuxJogger from '@/assets/reebok-lux-jogger.jpg'
import lululemonAlignPant from '@/assets/lululemon-align-pant.jpg'
import lululemonEnergyBra from '@/assets/lululemon-energy-bra.jpg'
import gymsharkVitalLeggings from '@/assets/gymshark-vital-leggings.jpg'
import aloYogaAirliftLegging from '@/assets/alo-yoga-airlift-legging.jpg'
import tyrMaxfitSwimsuit from '@/assets/tyr-maxfit-swimsuit.jpg'

const searchQuery = ref('')
const selectedBrand = ref('')
const brands = ['Nike', 'Adidas', 'Puma', 'Under Armour', 'Reebok', 'Lululemon', 'Gymshark', 'Alo','TYR']

const products = ref([
  { id: 1, name: 'Nike Hoodie', brand: 'Nike', price: '€60', image: nikeHoodie  },
  { id: 2, name: 'Adidas Shorts', brand: 'Adidas', price: '€40', image: adidasShorts },
  { id: 3, name: 'Puma T-Shirt', brand: 'Puma', price: '€30', image: pumaTShirt },
  { id: 4, name: 'Under Armour Tank Top', brand: 'Under Armour', price: '€35', image: underArmourTankTop },
  { id: 5, name: 'Reebok Sneakers', brand: 'Reebok', price: '€85', image: reebokSneakers },
  { id: 6, name: 'Nike Air Max 270', brand: 'Nike', price: '€120', image: nikeAirMax270 },
  { id: 7, name: 'Adidas Ultraboost 22', brand: 'Adidas', price: '€140', image: adidasUltraboost22 },
  { id: 8, name: 'Puma Cali Star', brand: 'Puma', price: '€90', image: pumaCaliStar  },
  { id: 9, name: 'Under Armour Favorite Hat', brand: 'Under Armour', price: '€20', image: uaFavoriteHat },
  { id: 10, name: 'Reebok Lux Jogger Pants', brand: 'Reebok', price: '€65', image: reebokLuxJogger },
  { id: 11, name: 'Lululemon Align High-Rise Pant', brand: 'Lululemon', price: '€98', image: lululemonAlignPant },
  { id: 12, name: 'Lululemon Energy Bra', brand: 'Lululemon', price: '€48', image: lululemonEnergyBra },
  { id: 13, name: 'Gymshark Vital Seamless Leggings', brand: 'Gymshark', price: '€55', image: gymsharkVitalLeggings },
  { id: 14, name: 'Alo Yoga High-Waist Airlift Legging', brand: 'Alo Yoga', price: '€110', image: aloYogaAirliftLegging },
  { id: 15, name: 'TYR Durafast Elite Maxfit Swimsuit', brand: 'TYR', price: '€75', image: tyrMaxfitSwimsuit },
])

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesBrand = !selectedBrand.value || p.brand === selectedBrand.value
    const matchesQuery = !searchQuery.value || p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesBrand && matchesQuery
  })
})

function search() {
  // Optionally handle something on click, not required for computed
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600&display=swap');

.custom-body {
  background-color: rgb(216, 182, 223);
  font-family: 'Quicksand', sans-serif;
  width: 100%;
}
.sport-wear {
  font-family: 'Quicksand', sans-serif;
  margin-top: 70px;
}

.brand-selector select {
  margin-top: 20px;
  font-size: 16px;
  width:40%;
}

.search input {
  width: 50%;
  display: inline-block;
  margin-top: 20px;
}

.search button {
  margin-left: -8px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.product-item {
  background-color: white;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-align: center;
  margin-bottom: 15px;
}

.product-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-item h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-item .price {
  color: #333;
  margin-bottom: 15px;
}

.product-item button {
  background-color: black;
  color: white;
  padding: 10px 20px;
  width: 100%;
  border: none;
  border-radius: 5px;
  transition: background-color 0.2s ease;
}

.product-item button:hover {
  background-color: rgb(88, 69, 92);
}

.product-item:hover {
  transform: translateY(-5px);
}

@media (max-width: 768px) {
  .search input {
    width: 60%;
  }
}

.product-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product-item img {
  object-fit: cover;
  height: 250px;
}

</style>