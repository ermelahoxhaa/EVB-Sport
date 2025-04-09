
<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Përdoruesi:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Fjalëkalimi:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>

    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>

.login-container {
  width: 400px;
  margin: 100px auto;
  padding: 40px;
  background-color: #2C2C2C;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

div {
  margin-bottom: 20px;
}

label {
  font-size: 1rem;
  color: #fff;
  margin-bottom: 5px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #555;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
  background-color: #444;
  color: #fff;
  transition: border-color 0.3s ease-in-out;
}

input:focus {
  border-color:rgb(156, 65, 121);
}

button {
  background-color: rgb(126, 71, 105);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color:rgb(62, 21, 52);
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 480px) {
  .login-container {
    width: 90%;
    padding: 30px;
  }

  h1 {
    font-size: 1.5rem;
  }

  input,
  button {
    font-size: 0.9rem;
    padding: 10px;
  }
}
</style>


