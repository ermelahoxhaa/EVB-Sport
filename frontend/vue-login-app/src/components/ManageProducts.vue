<template>
  <div class="container py-4">
    <h2 class="mb-4">Manage Products</h2>

    <button @click="fetchOrders" class="btn btn-outline-dark mb-3">View Orders</button>

<div v-if="orders.length">
  <h4>Orders List</h4>
  <table class="table">
    <thead>
      <tr>
        <th>Product</th>
        <th>User</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.product_name }}</td>
        <td>{{ order.user_name }}</td>
        <td>{{ order.email }}</td>
        <td>{{ order.phone }}</td>
        <td>{{ order.address }}</td>
        <td>{{ new Date(order.created_at).toLocaleString() }}</td>
      </tr>
    </tbody>
  </table>
</div>


    <form @submit.prevent="submitForm" class="mb-5" enctype="multipart/form-data">
      <div class="mb-3">
         <div v-if="showBackButton" class="col-auto">
          <button
            type="button"
            class="btn btn-outline-secondary back-btn"
            title="Back to Dashboard"
            @click="goBack"
          >
            <i class="bi bi-arrow-left"></i>
          </button>
        </div>
        <input
          v-model="form.name"
          type="text"
          class="form-control"
          placeholder="Product Name"
          required
        />
      </div>
      <div class="mb-3">
        <input
          v-model.number="form.price"
          type="number"
          step="0.01"
          class="form-control"
          placeholder="Price"
          required
        />
      </div>
      <div class="mb-3">
        <input
          v-model="form.brand"
          type="text"
          class="form-control"
          placeholder="Brand"
        />
      </div>
      <div class="mb-3">
        <input ref="fileInput" type="file" class="form-control" @change="onFileChange" />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        :style="{ backgroundColor: 'rgb(128, 97, 114)' }"
      >
        {{ editingId ? 'Update' : 'Add' }} Product
      </button>
      <button
        v-if="editingId"
        type="button"
        class="btn btn-secondary ms-2"
        @click="resetForm"
      >
        Cancel
      </button>
    </form>

    <div v-if="products && products.length > 0" class="row g-3 mb-5">
      <div class="col-md-4" v-for="product in products" :key="product.id">
        <div class="card h-100">
          <img
            :src="product.image"
            class="card-img-top"
            alt="Product Image"
            style="height: 200px; object-fit: contain;"
          />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.brand }} - ${{ product.price }}</p>
            <button class="btn btn-primary" @click="editProduct(product)"
            style="background-color: rgb(128, 97, 114); border-color: rgb(100, 75, 90);">
              Edit
            </button>
            <button
              class="btn btn-danger"
              @click="deleteProduct(product.id)"
              style="background-color:rgb(193, 107, 104); margin-left: 5px;"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>No products found.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ManageProducts",
  data() {
    return {
      products: [],
       orders: [],
      form: {
        name: "",
        price: null,
        brand: "",
        image: null, 
      },
      editingId: null,
      existingImage: null, 
      showBackButton: false

    };
  },
  mounted() {
  
  if (window.location.pathname === '/manageproducts') {
    this.showBackButton = true;
  } 

  this.fetchProducts();
},
  created() {
    this.fetchProducts();
  },
  methods: {
  async fetchProducts() {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      this.products = response.data.map(p => ({
        ...p,
        image: p.image ? `/uploads/${p.image}` : null
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  goBack() {
    this.$router.push('/dashboard');
  },

  onFileChange(event) {
    if (event.target.files.length) {
      this.form.image = event.target.files[0];
    } else {
      this.form.image = null;
    }
  },
  editProduct(product) {
    this.editingId = product.id;
    this.form.name = product.name;
    this.form.price = product.price;
    this.form.brand = product.brand;
    this.existingImage = product.image ? product.image.replace('/uploads/', '') : null;
    this.form.image = null;
    this.$refs.fileInput.value = null; 
  },
  resetForm() {
    this.editingId = null;
    this.existingImage = null;
    this.form = { name: "", price: null, brand: "", image: null };
    if (this.$refs.fileInput) this.$refs.fileInput.value = null;
  },
  async submitForm() {
    try {
      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("price", this.form.price);
      formData.append("brand", this.form.brand);
      if (this.form.image) {
        formData.append("image", this.form.image);
      } else if (this.editingId && this.existingImage) {
        formData.append("existingImage", this.existingImage);
      }

      if (this.editingId) {
        await axios.put(
          `http://localhost:3000/api/products/${this.editingId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/products",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      this.resetForm();
      this.fetchProducts();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  },
  async deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      this.fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },
},

async fetchOrders() {
    try {
      const res = await axios.get('http://localhost:3000/api/orders')
      this.orders = res.data
    } catch (err) {
      console.error('Error fetching orders:', err)
    }
  }

};
</script>

<style scoped>
.back-btn {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  padding: 0;
  margin-left: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  line-height: 1;
}

.back-btn i {
  margin: 0;
}

.back-btn:hover {
  background-color: rgb(128, 97, 114);
  color: white;
  border-color: rgb(128, 97, 114);
  transition: background-color 0.3s ease;
}

.card {
  border-radius: 12px;
}
</style>
