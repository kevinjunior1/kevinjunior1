<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="bi bi-hospital-fill"></i> Digital Clinic System
        </a>
        <button
          class="navbar-toggler"
          type="button"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          :class="['navbar-nav', 'ms-auto', { show: mobileMenuOpen }]"
          class="nav-links"
        >
          <router-link
            to="/"
            class="nav-link"
            :class="{ active: $route.path === '/' }"
          >
            <i class="bi bi-clipboard-check"></i> Check-in
          </router-link>
          <router-link
            to="/profile"
            class="nav-link"
            :class="{ active: $route.path === '/profile' }"
          >
            <i class="bi bi-person-circle"></i> My Profile
          </router-link>
          <router-link
            to="/queue"
            class="nav-link"
            :class="{ active: $route.path === '/queue' }"
          >
            <i class="bi bi-list-ul"></i> Queue Status
          </router-link>
          <router-link
            to="/health-guide"
            class="nav-link"
            :class="{ active: $route.path === '/health-guide' }"
          >
            <i class="bi bi-heart-pulse"></i> Health Guide
          </router-link>
          <router-link
            to="/help"
            class="nav-link"
            :class="{ active: $route.path === '/help' }"
          >
            <i class="bi bi-question-circle"></i> Help
          </router-link>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view />
    </div>

    <footer class="footer mt-5 py-4 bg-light">
      <div class="container text-center text-muted">
        <p class="mb-0">
          &copy; 2026 Digital Clinic System. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'App',
  setup() {
    const mobileMenuOpen = ref(false)

    return {
      mobileMenuOpen
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.25rem;
}

.navbar-brand i {
  margin-right: 0.5rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: auto;
}

.nav-link {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  transition: color 150ms ease, border-color 150ms ease;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link:hover {
  color: white;
}

.nav-link.active {
  color: white;
  border-bottom-color: white;
}

.nav-link i {
  font-size: 1.125rem;
}

.container {
  flex: 1;
}

.footer {
  margin-top: auto;
}

@media (max-width: 992px) {
  .nav-links {
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
    margin-left: 0;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  .nav-links.show {
    display: flex;
  }

  .nav-link {
    padding: 0.75rem 0;
    border-bottom: none;
  }

  .nav-link.active {
    border-bottom: none;
    color: white;
  }
}

@media (max-width: 640px) {
  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}
</style>
