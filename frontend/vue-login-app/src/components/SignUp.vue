<template>
    <body class="custom-body">
      <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <div class="wrapper card shadow border-0 p-4">
          <h1 class="text-center mb-4">Sign Up</h1>
          <form @submit.prevent="signup">
            <div class="input-box form-group mb-3">
              <input
                type="text"
                v-model="firstName"
                id="firstName"
                class="form-control custom-input"
                placeholder="First Name"
                required
              />
            </div>
            <div class="input-box form-group mb-3">
              <input
                type="text"
                v-model="lastName"
                id="lastName"
                class="form-control custom-input"
                placeholder="Last Name"
                required
              />
            </div>
            <div class="input-box form-group mb-3">
              <input
                type="email"
                v-model="email"
                id="email"
                class="form-control custom-input"
                placeholder="Email"
                required
              />
            </div>
            <div class="input-box form-group mb-3">
              <input
                type="password"
                v-model="password"
                id="password"
                class="form-control custom-input"
                placeholder="Password"
                required
              />
            </div>
            <div class="input-box form-group mb-3">
              <input
                type="password"
                v-model="confirmPassword"
                id="confirmPassword"
                class="form-control custom-input"
                placeholder="Confirm password"
                required
              />
            </div>
            <button type="submit" class="btn w-100 custom-btn">Sign Up</button>
          </form>
  
          <div v-if="errorMessage" class="alert alert-danger mt-3 text-center">
            <p class="mb-0">{{ errorMessage }}</p>
          </div>
  
          
          <div class="text-center mt-3">
            <span style="color: rgba(255, 255, 255, 0.8);">Already have an account?</span>
            <a href="/login" class="text-decoration-none" style="color: rgb(237, 159, 252); font-weight: 600;">
              Login here
            </a>
          </div>
        </div>
      </div>
    </body>
  </template>
  
  

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const signup = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match!';
    return;
  }

  try {
    const res = await axios.post('http://localhost:3000/api/auth/signup', {
      email: email.value,
      password: password.value,
    });

    console.log(res.data);

    alert('Registration was successful!');
    window.location.href = '/login'; 
    
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Error during registration!';
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&display=swap');

.custom-body {
  background-color: rgb(216, 182, 223);
  font-family: 'Quicksand', sans-serif;
}
.wrapper {
  background-color: rgb(43, 43, 43);
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
}
.custom-input {
  background-color: white;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 16px;
  border: 2px solid rgb(23, 6, 27);
  transition: border-color 0.3s ease-in-out;
}
h1 {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
}
.custom-input:focus {
  border-color: rgb(237, 159, 252);
  box-shadow: none;
}
.custom-btn {
  background-color: rgb(94, 64, 100);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  height: 45px;
  border: none;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
}
.custom-btn:hover {
  background-color: rgb(153, 111, 160);
}
@media (max-width: 480px) {
  .wrapper {
    padding: 20px;
  }
  h1 {
    font-size: 24px;
  }
  .custom-input {
    font-size: 14px;
    padding: 10px 15px;
  }
  .custom-btn {
    font-size: 14px;
    height: 40px;
  }
}
</style>
