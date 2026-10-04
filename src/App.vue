<template>
  <div id="app">
    <!-- Header -->
    <AppHeader />
    
    <!-- Main Content -->
    <main>
      <router-view />
    </main>
    
    <!-- Footer -->
    <AppFooter />
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
  }
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding-top: 60px; /* Account for fixed header */
}
</style>