<template>
  <section id="providers" class="providers-section">
    <div class="container">
      <h2 class="heading">Provider-agnostic</h2>
      <p class="paragraph">Use any LLM backend. Built-in support for:</p>
      
      <div class="cards-grid">
        <div class="card">
          <h3 class="card-title">Anthropic</h3>
          <p class="card-subtitle">Claude models</p>
          <code class="card-code">provider: "anthropic"</code>
        </div>
        
        <div class="card">
          <h3 class="card-title">OpenAI</h3>
          <p class="card-subtitle">GPT models</p>
          <code class="card-code">provider: "openai"</code>
        </div>
        
        <div class="card">
          <h3 class="card-title">Custom</h3>
          <p class="card-subtitle">Ollama, vLLM, LM Studio, or any OpenAI-compatible endpoint</p>
          <code class="card-code">provider: "custom"</code>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.providers-section {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.heading {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}

.paragraph {
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #a3a3a3;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.card {
  background-color: #161616;
  border: 1px solid #262626;
  border-radius: 0.75rem;
  padding: 2rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.card-subtitle {
  font-size: 1rem;
  color: #999;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.card-code {
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  color: #60a5fa;
  background-color: rgba(96, 165, 250, 0.1);
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  display: inline-block;
}

@media (min-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 767px) {
  .heading {
    font-size: 2rem;
  }
  
  .paragraph {
    font-size: 1.125rem;
  }
  
  .card {
    padding: 1.5rem;
  }
}
</style>