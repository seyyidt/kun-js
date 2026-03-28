<template>
  <section class="git-sync-contract">
    <div class="container">
      <h2 class="heading">{{ content.heading }}</h2>
      <p class="paragraph">{{ content.paragraph }}</p>
      
      <div class="visual-container">
        <div class="item">
          <div class="item-label">.kun file</div>
          <div class="item-subtitle">Ground truth for intent</div>
        </div>
        
        <div class="divider"></div>
        
        <div class="item">
          <div class="item-label">Source file</div>
          <div class="item-subtitle">Ground truth for implementation</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const content = {
  heading: "The git sync contract",
  paragraph: "When you commit both a .kun file and its generated source file together, they are declared in sync. After that, you own the generated code — edit it freely. The .kun file remains as documentation of intent."
}
</script>

<style scoped>
.git-sync-contract {
  background-color: #111111;
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.heading {
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.paragraph {
  font-size: 1.125rem;
  line-height: 1.7;
  text-align: center;
  margin-bottom: 3rem;
  color: #a3a3a3;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.visual-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
}

.item {
  background: #1a1a1a;
  border: 1px solid #262626;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
}

.item-label {
  font-size: 1.25rem;
  font-weight: 600;
  color: #e5e5e5;
  margin-bottom: 0.5rem;
}

.item-subtitle {
  font-size: 0.875rem;
  color: #a3a3a3;
}

.divider {
  width: 1px;
  height: 4rem;
  background-color: #333;
}

@media (max-width: 768px) {
  .git-sync-contract {
    padding: 3rem 0;
  }
  
  .heading {
    font-size: 1.875rem;
  }
  
  .visual-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .divider {
    width: 4rem;
    height: 1px;
    justify-self: center;
  }
  
  .item {
    padding: 1.5rem;
  }
}
</style>