<template>
  <section id="install" class="install-section">
    <div class="container">
      <h2 class="heading">Install</h2>
      <div class="code-block">
        <code>npm install -g @seyyidt/kun-js</code>
      </div>
      <p class="requirement-text">Requires Node.js >= 20</p>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.install-section {
  background-color: #111111;
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.heading {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #ffffff;
}

.code-block {
  background-color: #161616;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 0 auto 1rem auto;
  max-width: 500px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.code-block code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 1.1rem;
  color: #ffffff;
  white-space: nowrap;
}

.requirement-text {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
}
</style>