<template>
  <div id="app">
    <AppHeader v-if="!hideLayout"/>
    <router-view />
    <AppFooter v-if="!hideLayout"/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
    },
    computed: {
    hideLayout() {
return this.$route.path === '/dashboard' || this.$route.path === '/manageproducts' || this.$route.path === '/manageadmin';

    }
  }

}
</script>

