<template>
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">kun</h1>
      <div class="arabic-text">كُن فَيَكُونُ</div>
      <p class="tagline">Be, and it is — the imperative form of existence.</p>
      <p class="sub-tagline">You state intent. Kun translates it into real code.</p>
      <div class="button-group">
        <a href="#install" class="btn btn-primary">Get started</a>
        <a href="https://github.com/seyyidt/kun-js" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">View on GitHub</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  width: 100%;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffffff;
  line-height: 1.1;
}

.arabic-text {
  font-size: 2rem;
  color: #a3a3a3;
  margin-bottom: 2rem;
  font-family: 'Arial Unicode MS', 'Tahoma', sans-serif;
  letter-spacing: 0.1em;
}

.tagline {
  font-size: 1.25rem;
  color: #d4d4d4;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.sub-tagline {
  font-size: 1.1rem;
  color: #a3a3a3;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  border: 2px solid transparent;
  min-width: 140px;
}

.btn-primary {
  background-color: #f59e0b;
  color: white;
  border-color: #f59e0b;
}

.btn-primary:hover {
  background-color: #d97706;
  border-color: #d97706;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: transparent;
  color: #e5e5e5;
  border-color: #525252;
}

.btn-secondary:hover {
  background-color: #1a1a1a;
  border-color: #737373;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 1.5rem;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .arabic-text {
    font-size: 1.5rem;
  }
  
  .button-group {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .tagline {
    font-size: 1.1rem;
  }
  
  .sub-tagline {
    font-size: 1rem;
  }
}
</style>