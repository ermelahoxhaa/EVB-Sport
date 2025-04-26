<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <ProductList />
    
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import ProductList from './components/ProductList.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ProductList
  }
}
</script>

