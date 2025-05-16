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
          <p class="price">{{ product.price }}€</p>
          <button class="btn">Add to cart</button>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const searchQuery = ref('')
const selectedBrand = ref('')
const brands = ref([])  

const products = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api')
    const data = await res.json()
    products.value = data

    
    brands.value = [...new Set(data.map(p => p.brand))].sort()

  } catch (error) {
    console.error('Gabim gjatë marrjes së produkteve:', error)
  }
})

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesBrand = !selectedBrand.value || p.brand === selectedBrand.value
    const matchesQuery = !searchQuery.value || p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesBrand && matchesQuery
  })
})
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
  padding: 15px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-align: center;
  margin-bottom: 15px;
}

.product-item img {
  width: 100%;
  height: 220px;
  object-fit: cover;
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