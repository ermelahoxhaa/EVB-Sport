<template>
  <div id="app">
    <AppHeader />
    <main class="content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding-top: 70px; /* Adjust for header height */
  padding-bottom: 50px; /* Adjust for footer height */
  background-color: #f9f9f9; /* Optional: Add a background color */
}
</style>

