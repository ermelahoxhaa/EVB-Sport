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
      <button type="submit" class="btn btn-primary" :style="{ backgroundColor: '#6f42c1' }">{{ editingId ? 'Update' : 'Add' }} Product</button>
      <button v-if="editingId" type="button" class="btn btn-secondary ms-2" @click="resetForm">Cancel</button>
    </form>

   
    <div v-if="products.length" class="row g-3 mb-5">
      <div class="col-md-4" v-for="product in products" :key="product.id">
        <div class="card h-100">
          <img :src="`/uploads/${product.image}`" class="card-img-top" alt="Product Image" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.brand }} - ${{ product.price }}</p>
            <button class="btn btn-primary" @click="editProduct(product)">Edit</button>
            <button class="btn btn-danger" @click="deleteProduct(product.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      form: { name: "", price: "", brand: "", image: null },
      editingId: null,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        this.products = response.data;
      } catch (error) {
        console.error("There was an error fetching the products:", error);
      }
    },
    editProduct(product) {
      this.form = { ...product };
      this.editingId = product.id;
    },
    resetForm() {
      this.form = { name: "", price: "", brand: "", image: null };
      this.editingId = null;
    },
    async submitForm() {
      try {
        const formData = new FormData();
        formData.append("name", this.form.name);
        formData.append("price", this.form.price);
        formData.append("brand", this.form.brand);
        if (this.form.image) formData.append("image", this.form.image);

        if (this.editingId) {
          await axios.put(`http://localhost:3000/api/products/${this.editingId}`, formData);
    } else {
      await axios.post("http://localhost:3000/api/products", formData);
        }

        this.resetForm();
        this.fetchProducts(); 
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    onFileChange(event) {
      this.form.image = event.target.files[0];
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`);
        this.fetchProducts(); 
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  }
};
</script>
  
  <style scoped>
  .card {
    border-radius: 12px;
  }
  </style>
  