<template>
  <div class="index-box">
    <ydNav></ydNav>
    <router-view></router-view>
  </div>
</template>

<script>
import ydNav from '../components/ydNav'
export default {
  components: {
    ydNav
  }
}
</script>

<style>
  
</style>
