<template>
  <section class="what-is-kun">
    <h2 class="heading">What is kun?</h2>
    <p class="description">
      kun is a CLI tool that generates source code from .kun requirement files using LLMs. You describe what a file should do, and kun produces a working first draft.
    </p>
    
    <div class="flow-diagram">
      <div class="flow-step">
        <code class="step-box">SearchBar.vue.kun</code>
        <span class="step-label">Write</span>
      </div>
      
      <div class="arrow">→</div>
      
      <div class="flow-step">
        <code class="step-box">kun build</code>
        <span class="step-label">Build</span>
      </div>
      
      <div class="arrow">→</div>
      
      <div class="flow-step">
        <code class="step-box">SearchBar.vue</code>
        <span class="step-label">Result</span>
      </div>
    </div>
    
    <p class="filename-explanation">
      The filename encodes the output. Everything before .kun is the file that gets generated.
    </p>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.what-is-kun {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.heading {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
}

.description {
  font-size: 1.125rem;
  line-height: 1.75;
  color: #a3a3a3;
  margin-bottom: 3rem;
}

.flow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.step-box {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  white-space: nowrap;
  color: #e5e5e5;
}

.step-label {
  font-size: 0.875rem;
  color: #a3a3a3;
}

.arrow {
  font-size: 1.5rem;
  color: #737373;
}

.filename-explanation {
  color: #737373;
  font-size: 0.875rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .what-is-kun {
    padding: 1rem;
  }
  
  .flow-diagram {
    flex-direction: column;
    gap: 1rem;
  }
  
  .arrow {
    transform: rotate(90deg);
  }
  
  .step-box {
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>