<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">Clinic Check-in System</a>
        <div class="navbar-nav ms-auto">
          <router-link to="/" class="nav-link">Check-in</router-link>
          <router-link to="/profile" class="nav-link">My Profile</router-link>
          <router-link to="/help" class="nav-link">Help</router-link>
        </div>
      </div>
    </nav>
    
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>
