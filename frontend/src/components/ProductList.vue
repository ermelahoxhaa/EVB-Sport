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
          <img :src="product.image ? `http://localhost:3000/uploads/${product.image}` : ''" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p class="price">{{ product.price }}€</p>
          <button class="btn" @click="openOrderForm(product)">Add to cart</button>
        </div>
      </div>
    </section>

    <div v-if="showOrderForm" class="order-form-overlay">
  <div class="order-form">
    <h4>Complete your order for: {{ selectedProduct?.name }}</h4>
    <form @submit.prevent="submitOrder">
      <input v-model="orderForm.user_name" placeholder="Your Name" required />
      <input v-model="orderForm.email" placeholder="Email" />
      <input v-model="orderForm.phone" placeholder="Phone" />
      <input v-model="orderForm.address" placeholder="Address" />
      <button type="submit">Submit Order</button>
      <button @click="showOrderForm = false" type="button">Cancel</button>
    </form>
  </div>
</div>
  </div>
</div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../utils/auth'

const router = useRouter()
const showOrderForm = ref(false)
const selectedProduct = ref(null)

const searchQuery = ref('')
const selectedBrand = ref('')
const brands = ref([])  

const products = ref([])

const orderForm = ref({
  user_name: '',
  email: '',
  phone: '',
  address: ''
})

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/products')
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

const submitOrder = async () => {
  try {
    await axios.post('http://localhost:3000/api/orders', {
      product_id: selectedProduct.value.id,
      ...orderForm.value
    })
    alert('Order submitted successfully!')
    showOrderForm.value = false
    orderForm.value = { user_name: '', email: '', phone: '', address: '' }
  } catch (err) {
    console.error('Error submitting order:', err)
    alert('Failed to submit order.')
  }
}

const openOrderForm = (product) => {
  // per me kriju order user-i duhet te jete i loguar
  if (!auth.isLoggedIn()) {
    alert('Please login to add items to cart')
    router.push('/login')
    return
  }
  
  selectedProduct.value = product
  showOrderForm.value = true
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
.order-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.order-form {
  background: white;
  padding: 30px 25px;
  border-radius: 15px;
  width: 350px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  font-family: 'Quicksand', sans-serif;
}

.order-form h4 {
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
}

.order-form input {
  display: block;
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease-in-out;
}

.order-form input:focus {
  outline: none;
  border-color: #8859a4;
}

.order-form button {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: none;
  border-radius: 8px;
  background-color: #6d4c80;
  color: white;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.order-form button:hover {
  background-color: #55356e;
  transform: translateY(-2px);
}

.order-form button[type="button"] {
  background-color: #ddd;
  color: #333;
  margin-top: 10px;
}

.order-form button[type="button"]:hover {
  background-color: #ccc;
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