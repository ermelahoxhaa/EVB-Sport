<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <router-link to="/" class="navbar-brand">
      <span class="logo">
        <span class="evb">EVB</span>
        <img src="../assets/dumbbell.png" alt="dumbbell" class="dumbbell">
      </span>
    </router-link>

    <button @click="toggleNavbar" class="navbar-toggler">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div :class="['navbar-collapse', { 'active': isNavbarOpen }]">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active-link">About Us</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/products" class="nav-link" active-class="active-link">Products</router-link>
        </li>
        <li class="nav-item">
  <router-link v-if="route.path === '/signup'" to="/signup" class="nav-link" active-class="active-link">SignUp</router-link>
  <router-link v-else to="/login" class="nav-link" active-class="active-link">LogIn</router-link>
</li>

      </ul>
    </div>
  </nav>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isNavbarOpen = ref(false)

const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600&display=swap');

* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
}

body {
  font-family: 'Quicksand', sans-serif;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  background-color: rgb(255, 253, 253);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 28px;
  border-bottom: 1px solid black;
}

.logo {
  font-family: 'Dancing Script', cursive;
  font-size: 40px;
  display: flex;
  align-items: center;
}
.evb {
  margin-right:10px;
}
.dumbbell {
    margin-left:-23px;
    margin-top: 35px;
    width: 25px;
    height: auto;
}
.navbar-nav .nav-link {
  color: rgb(5, 2, 5);
  font-size: 18px;
  border-radius: 4px;
  padding: 10px 13px;
  transition: background-color 0.3s;
  margin-right: 50px;
}



.active-link {
  border-bottom: 2px solid rgb(158, 105, 168);
  transform: translateY(-5px);
  transition: all 0.3s ease;   
}
.navbar-toggler {
  display: none;
  background-color: transparent;
  border: none;
  font-size: 28px;
  cursor: pointer;
}
.navbar-collapse {
  display: flex;
}

.navbar-collapse.active {
  display: block;
}


@media (max-width: 820px) {
  .navbar-collapse {
    display: none;
    width: 100%;
    height: 100vh;
    background-color: rgb(41, 41, 41);
    position: absolute;
    top: 61px;
    left: 0;
    text-align: center;
    padding-bottom: 150px;
  }

  .navbar-nav .nav-item {
    margin: 20px 0;
  }

  .navbar-toggler {
    display: block;
  }

  .navbar-nav .nav-link {
    font-size: 1.2rem;
    margin: 25px 0;
  }
}
</style>
