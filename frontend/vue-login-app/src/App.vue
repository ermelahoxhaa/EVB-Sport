<template>
  <div id="app">
    <AppHeader />
    <LoginComponent />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import LoginComponent from './components/LoginComponent.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    LoginComponent
  }
};
</script>
