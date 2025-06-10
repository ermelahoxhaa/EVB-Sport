<template>
  
  <div class="container py-4">
    
    <h2 class="mb-4">Manage Users</h2>
    

    <form v-if="formVisible" @submit.prevent="submitForm" class="mb-5">
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
          placeholder="Full Name"
          required
        />
      </div>
      <div class="mb-3">
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          placeholder="Email"
          required
        />
      </div>
      <div class="mb-3">
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          placeholder="Password"
          :required="!editingId"
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        :style="{ backgroundColor: 'rgb(128, 97, 114)' }"
      >
        {{ editingId ? 'Update' : 'Create' }} Admin
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

    <div v-if="admins.length">
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th style="width: 150px">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in admins" :key="admin.id">
            <td>{{ admin.name }}</td>
            <td>{{ admin.email }}</td>
            <td>{{ admin.role === 1 ? 'Admin' : 'User' }}</td>
            <td>
              <button
                v-if="admin.role === 1"
                class="btn btn-sm btn-primary me-2"
                @click="editAdmin(admin)"
                style="background-color: rgb(128, 97, 114)"
              >
                Edit
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="deleteAdmin(admin.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No users found.</p>
    </div>
  </div>
</template>

<script>
import axios from '../axios';
import { auth } from '../utils/auth';

export default {
  name: 'CreateAdmin',
  data() {
    return {
      admins: [],
      form: {
        name: '',
        email: '',
        password: ''
      },
      editingId: null,
      showBackButton: false,
      formVisible: true,
    };
  },
  created() {
    this.resetForm();
    this.$nextTick(() => {
      this.fetchAdmins();
    });
  },
  mounted() {
    if (window.location.pathname === '/manageadmin') {
      this.showBackButton = true;
    } 
    this.fetchAdmins();
  },
 
  methods: {
    async fetchAdmins() {
      try {
        const res = await axios.get('http://localhost:3000/api/users', {
          withCredentials: true 
        })
        this.admins = res.data
      } catch (err) {
        console.error('Error fetching admins:', err)
        if (err.response?.status === 401) {
          alert('You are not authorized. Please login again.')
          await auth.logout();
          this.$router.push('/login')
        }
      }
    },
    goBack() {
    this.$router.push('/dashboard');
  },
  
   async submitForm() {
  try {
    const payload = {
      name: this.form.name,
      email: this.form.email,
      password: this.form.password,
      role: 1,
    };

    if (this.editingId) {
      await axios.put(`http://localhost:3000/api/users/${this.editingId}`, payload, {
        withCredentials: true }
      )
      alert('Admin updated!');
    } else {
      await axios.post('http://localhost:3000/api/users/create-admin', payload, {
        withCredentials: true }
      )
      alert('Admin created successfully!');
    }
    this.resetForm();
    this.fetchAdmins(); 
  } catch (err) {
    console.error('Error submitting admin:', err);
    alert(err.response?.data?.message || 'An error occurred');
  }
}
,
    editAdmin(admin) {
      this.editingId = admin.id;
      this.form.name = admin.name;
      this.form.email = admin.email;
      this.form.password = '';
    },
    resetForm() {
  this.editingId = null;

  this.form.name = '';
  this.form.email = '';
  this.form.password = '';

  this.$nextTick(() => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.blur());
  });
},
    async deleteAdmin(id) {
      if (!confirm('Are you sure you want to delete this admin?')) return
      
      try {
        await axios.delete(`http://localhost:3000/api/users/${id}`, {
          withCredentials: true
        })
        alert('Admin deleted successfully!');
        this.fetchAdmins(); 
      } catch (err) {
        console.error('Error deleting admin:', err);
        alert(err.response?.data?.message || 'An error occurred while deleting admin');
      }
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

.table th,
.table td {
  vertical-align: middle;
}
</style>
