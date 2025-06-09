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
                    <li><a href="#">At Bulevardi Bill Clinton<br>Prishtinë, Kosovë<br>+383 49 123 456</a></li>
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
