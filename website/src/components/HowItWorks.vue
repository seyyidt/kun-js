<template>
  <section id="how-it-works" class="how-it-works">
    <div class="container">
      <h2 class="heading">How it works</h2>
      
      <div class="steps">
        <div class="step">
          <div class="step-header">
            <div class="step-number">1</div>
            <h3 class="step-title">Configure your provider</h3>
          </div>
          <div class="code-block">
            <pre><code><span class="comment">// kun.config.js</span>
<span class="keyword">export default</span> {
  <span class="property">provider</span>: <span class="string">"anthropic"</span>,
  <span class="property">model</span>: <span class="string">"claude-sonnet-4-20250514"</span>,
  <span class="property">apiKey</span>: process.env.ANTHROPIC_API_KEY,
};</code></pre>
          </div>
        </div>

        <div class="step">
          <div class="step-header">
            <div class="step-number">2</div>
            <h3 class="step-title">Write a .kun file</h3>
          </div>
          <div class="code-block">
            <pre><code><span class="keyword">@target</span> vue3
<span class="keyword">@component</span> SearchBar

<span class="property">intent</span>:
  A search input for the app header.
  Debounces input and emits a search event.

<span class="property">props</span>:
  <span class="property">placeholder</span>: string (default: <span class="string">"Search..."</span>)
  <span class="property">debounceMs</span>:  number (default: 300)

<span class="property">behavior</span>:
  on input  -> debounce, then emit search
  on Escape -> clear input and emit empty string

<span class="property">constraints</span>:
  <span class="comment">- no external libraries</span>
  <span class="comment">- fully keyboard accessible</span></code></pre>
          </div>
        </div>

        <div class="step">
          <div class="step-header">
            <div class="step-number">3</div>
            <h3 class="step-title">Generate</h3>
          </div>
          <div class="code-block">
            <pre><code><span class="comment"># Generate a single file</span>
kun build SearchBar.vue.kun

<span class="comment"># Build all .kun files</span>
kun build

<span class="comment"># Preview without calling the API</span>
kun build --dry-run</code></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.how-it-works {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.heading {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #ffffff;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.step {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: #f59e0b;
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #e5e5e5;
}

.code-block {
  background: #161616;
  border-radius: 0.75rem;
  padding: 1.5rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.code-block code {
  color: #e4e4e4;
}

.comment {
  color: #7c7c7c;
}

.string {
  color: #a8cc8c;
}

.keyword {
  color: #9cdcfe;
}

.property {
  color: #79b8ff;
}

@media (max-width: 768px) {
  .heading {
    font-size: 2rem;
  }
  
  .step-title {
    font-size: 1.25rem;
  }
  
  .code-block {
    padding: 1rem;
  }
  
  .code-block pre {
    font-size: 0.8rem;
  }
}
</style>