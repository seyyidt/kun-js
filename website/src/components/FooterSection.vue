<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="logo">kun</div>
      <nav class="links">
        <a href="https://github.com/seyyidt/kun-js" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.npmjs.com/package/@seyyidt/kun-js" target="_blank" rel="noopener noreferrer">npm</a>
        <a href="https://github.com/seyyidt/kun-js/issues" target="_blank" rel="noopener noreferrer">Issues</a>
      </nav>
      <div class="license">MIT License</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer {
  border-top: 1px solid #262626;
  padding: 3rem 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: #888;
}

.links {
  display: flex;
  gap: 2rem;
}

.links a {
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.links a:hover {
  color: #999;
}

.license {
  color: #555;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .footer-content {
    padding: 0 1rem;
  }
  
  .links {
    gap: 1.5rem;
  }
}
</style>