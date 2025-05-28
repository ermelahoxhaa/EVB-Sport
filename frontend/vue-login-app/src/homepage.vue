<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <router-link to="/" class="navbar-brand">
      <span class="logo">
        <span class="evb">EVB</span>
        <img src="../assets/dumbbell.png" alt="dumbbell" class="dumbbell">
      </span>
    </router-link>

    <input type="checkbox" id="checkbox" class="d-none">
    <label for="checkbox" class="navbar-toggler">
      <span class="navbar-toggler-icon"></span>
    </label>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About Us</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/products" class="nav-link">Products</router-link>
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
  color: rgb(5, 2, 5);
  font-size: 18px;
  border-radius: 4px;
  padding: 10px 13px;
  transition: background-color 0.3s;
  margin-right: 50px;
}

.navbar-nav .nav-link.active, .navbar-nav .nav-link:hover {
  color:rgb(158, 105, 168);
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
    margin: 20px 0;
  }

  .navbar-toggler {
    display: block;
  }

  .navbar-toggler-icon {
    font-size: 28px;
    color: black;
  }

  .navbar-nav .nav-link {
    font-size: 1.2rem;
    margin: 25px 0;
  }

  #checkbox:checked ~ .navbar-collapse {
    left: 0;
  }
}
</style>
<template>
  <div class="homepage">
    <!-- Main Content (Homepage Section) -->
    <section class="hero">
      <h1>Welcome to EVB Sport</h1>
      <p>Your ultimate destination for premium sportswear, designed for style and performance.</p>

      <button @click="goToShop">Shop Now</button>
    </section>

    <section class="featured">
      <h2>Featured Products</h2>
      <div class="product-list">
        <div class="product" v-for="(product, index) in featuredProducts" :key="index">
          
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <button @click="viewProduct(product.id)">View Product</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      featuredProducts: [
        {
          id: 1,
          name: 'Running Shoes',
          description: 'High-performance shoes for running enthusiasts.',
          image: require('@/assets/images/shoes.jpg') 
        },
        {
          id: 2,
          name: 'Gym Gloves',
          description: 'Get a grip on your workout with durable gym gloves.',
          image: require('@/assets/images/gloves.jpg') 
        },
        {
          id: 3,
          name: 'Sports Bottles',
          description: 'Stay hydrated with our sleek, leak-proof bottles.',
          image: require('@/assets/images/bottle.jpg') 
        }
      ]
    };
  },
  methods: {
    goToShop() {
      // Placeholder for shop navigation (You can replace it with Vue Router)
      alert('Navigating to the shop...');
    },
    viewProduct(productId) {
      // Handle product view logic (You can integrate Vue Router for this)
      alert(`Viewing product with ID: ${productId}`);
    }
  }
};
</script>

<style scoped>
.homepage {
  padding: 20px;
  text-align: center;
}

.hero {
  background: linear-gradient(to right, #007bff, #00c6ff);
  color: white;
  padding: 60px 20px;
  border-radius: 12px;
}

.hero button {
  margin-top: 20px;
  padding: 10px 20px;
  font-weight: bold;
  background-color: white;
  color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.featured {
  margin-top: 40px;
}

.product-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
}

.product {
  background: #f5f5f5;
  padding: 10px;
  width: 200px;
  border-radius: 8px;
  margin: 10px;
}

.product img {
  width: 100%;
  border-radius: 8px;
}

.product button {
  margin-top: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.product button:hover {
  background-color: #0056b3;
}
</style>


<template>
  <footer class="footer">
      <div class="container">
      <div class="map">
          <img src="../assets/map.png" alt="map" />
          </div>
          <div class="row">
              <div class="footer-col">
                  <h4>Contact Us</h4>
                  <ul>
                      <li><a href="#">At Bulevardi Bill Clinton<br>Prishtinë, Kosovë<br>‪+383 49 123 456‬</a></li>
                      <li><a href="#">evb@sportwearplatform.com</a></li>
                  </ul>
              </div>
              <div class="footer-col">
                  <h4>Support</h4>
                  <ul>
                      <li><a href="#">Returns & Exchanges</a></li>
                      <li><a href="#">About Us</a></li>
                      <li><a href="#">Shipping Information</a></li>
                  </ul>
              </div>
              <div class="footer-col">
                  <h4>Follow us</h4>
                  <ul>
                      <li><a href="#">Facebook</a></li>
                      <li><a href="#">Instagram</a></li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="copyrights">
        <p>Copyright © 2025 EVB. All rights reserved!</p>
    </div>
</footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&display=swap');

.footer {
  background-color: rgb(235, 235, 235);
  font-family: 'Quicksand', sans-serif;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 10px 0px 8px 0px rgba(129, 129, 129, 0.1);
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
}
.container {
  max-width: 1480px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.map {
  padding-right: 40px;
}

.map img {
  width: 300px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: 260px;
}
.footer-col {
  padding: 40px;
  width: auto;
}

.footer-col h4 {
  font-family: 'Quicksand';
  margin-bottom: 20px;
  text-decoration: overline;
  color: black;
}

.footer-col ul {
  padding: 0;
  list-style: none;
}
.footer-col ul li {
  margin-bottom: 10px;
}

.footer-col ul li a {
  color: black;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-col ul li a:hover {
  color: rgb(186, 11, 221);
}

.footer-col .social-links a {
  display: inline-block;
  height: 40px;
  width: 40px;
  background-color: rgba(200, 200, 200, 0.2);
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  margin: 0 10px 10px 0;
}

.footer-col .social-links a:hover {
  background-color: white;
  color: black;
}
.copyrights {
  text-align: center;
  padding: 20px 0;
  background-color: rgb(235, 235, 235);
  color: #333;
}
@media (max-width: 780px) {
  .container {
    flex-direction: column;
    padding: 10px;
    width: 100%;
  }

  .row {
    flex-direction: column;
    margin-left: 0;
    align-items: center;
    width: 100%;
  }

  .footer {
    padding: 10px;
    width: 100%;
  }

  .footer-col {
    padding: 20px;
    width: 100%;
    text-align: center;
  }
}
</style>
FOOTER

  