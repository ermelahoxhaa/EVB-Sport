<template>
  <div id="app">
    <AppHeader />
    <LoginComponent />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import LoginComponent from './components/LoginComponent.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    LoginComponent,
    AppFooter
  }
};
</script>
