<template>
    <div class="container py-4">
      <h2 class="mb-4">Manage Products</h2>
  
      
      <form @submit.prevent="submitForm" class="mb-5">
        <div class="mb-3">
          <input v-model="form.name" type="text" class="form-control" placeholder="Product Name" required />
        </div>
        <div class="mb-3">
          <input v-model.number="form.price" type="number" class="form-control" placeholder="Price" required />
        </div>
        <div class="mb-3">
          <input v-model="form.brand" type="text" class="form-control" placeholder="Brand" required />
        </div>
        <div class="mb-3">
          <input type="file" class="form-control" @change="onFileChange" />
        </div>
        <button type="submit" class="btn btn-primary">{{ editingId ? 'Update' : 'Add' }} Product</button>
        <button v-if="editingId" type="button" class="btn btn-secondary ms-2" @click="resetForm">Cancel</button>
      </form>
  
      
      <div v-if="products.length" class="row g-3 mb-5">
        <div class="col-md-4" v-for="product in products" :key="product.id">
          <div class="card h-100">
            <img v-if="product.image" :src="backendUrl + product.image" class="card-img-top" style="height: 200px; object-fit: cover;" />
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">Brand: {{ product.brand }}<br>Price: ${{ product.price }}</p>
              <button class="btn btn-sm btn-warning me-2" @click="editProduct(product)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="deleteProduct(product.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
  
      
      <h4>Admin Action Logs</h4>
      <ul class="list-group">
        <li v-for="log in logs" :key="log.action_time" class="list-group-item d-flex justify-content-between">
          <span>{{ log.product_name }} - {{ log.action }}</span>
          <small>{{ new Date(log.action_time).toLocaleString() }}</small>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const backendUrl = 'http://localhost:3000'
  
  const products = ref([])
  const logs = ref([])
  
  const form = ref({
    name: '',
    price: '',
    brand: '',
    image: null
  })
  
  const editingId = ref(null)
  
  const fetchProducts = async () => {
    const res = await axios.get(`${backendUrl}/api/products`)
    products.value = res.data
  }
  
  const fetchLogs = async () => {
    const res = await axios.get(`${backendUrl}/api/products/logs/all`)
    logs.value = res.data
  }
  
  const onFileChange = (e) => {
    form.value.image = e.target.files[0]
  }
  
  const resetForm = () => {
    editingId.value = null
    form.value = { name: '', price: '', brand: '', image: null }
  }
  
  const submitForm = async () => {
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('price', form.value.price)
    formData.append('brand', form.value.brand)
    if (form.value.image) formData.append('image', form.value.image)
  
    if (editingId.value) {
      await axios.put(`${backendUrl}/api/products/${editingId.value}`, formData)
    } else {
      await axios.post(`${backendUrl}/api/products`, formData)
    }
  
    await fetchProducts()
    await fetchLogs()
    resetForm()
  }
  
  const editProduct = (product) => {
    editingId.value = product.id
    form.value.name = product.name
    form.value.price = product.price
    form.value.brand = product.brand
    form.value.image = null 
  }
  
  const deleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await axios.delete(`${backendUrl}/api/products/${id}`)
      await fetchProducts()
      await fetchLogs()
    }
  }
  
  onMounted(() => {
    fetchProducts()
    fetchLogs()
  })
  </script>
  
  <style scoped>
  .card {
    border-radius: 12px;
  }
  </style>
  