<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <router-link to="/" class="navbar-brand">
      <span class="logo">
        <span class="evb">EVB</span>
        <img src="../assets/dumbbell.png" alt="dumbbell" class="dumbbell">
      </span>
    </router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/makeup" class="nav-link">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About Us</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link active">LogIn</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

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
  color: black;
  font-size: 17px;
  border-radius: 4px;
  padding: 7px 13px;
  transition: background-color 0.3s;
}

.navbar-nav .nav-link.active, .navbar-nav .nav-link:hover {
  color:rgb(211, 77, 238);
}

@media (max-width: 820px) {
  .navbar .navbar-collapse {
    position: fixed;
    left: -150%;
    width: 100%;
    height: 100vh;
    background-color: rgb(41, 41, 41);
    transition: left 0.5s;
    text-align: center;
    top: 61px;
    margin: 0;
    padding-bottom: 150px;
  }

  .navbar-nav .nav-item {
    margin: 15px 0;
  }

  .navbar-toggler {
    display: block;
  }

  .navbar-toggler-icon {
    font-size: 28px;
    color: black;
  }

  .navbar-nav .nav-link {
    font-size: 1.1rem;
  }

  #checkbox:checked ~ .navbar-collapse {
    left: 0;
  }
}
</style>
