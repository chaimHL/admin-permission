<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { initDynamicRoutes } from '@/router/index.js'
export default {
  name: 'app',
  created() {
    initDynamicRoutes()
  }
}
</script>

<style>
 #app {
   width: 100%;
   height: 100vh;
 }
</style>
