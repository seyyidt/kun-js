<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-left">
        <a href="/" class="logo">kun</a>
      </div>
      <div class="navbar-right">
        <a href="#install" class="nav-link">Install</a>
        <a href="#how-it-works" class="nav-link">How it works</a>
        <a href="#providers" class="nav-link">Providers</a>
        <a href="https://github.com/seyyidt/kun-js" class="nav-link" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: color 0.2s ease;
}

.logo:hover {
  color: #f0f0f0;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: white;
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 0.75rem 1rem;
  }
  
  .navbar-right {
    gap: 1rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0.5rem 0.75rem;
  }
  
  .navbar-right {
    gap: 0.75rem;
  }
  
  .nav-link {
    font-size: 0.8rem;
  }
}
</style>