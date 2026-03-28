<template>
  <section class="write-what-not-how">
    <div class="container">
      <h2 class="heading">Write what, not how</h2>
      <p class="paragraph">
        A .kun file is plain, structured natural language. No strict syntax — clarity is the only rule.
      </p>
      
      <div class="columns">
        <div class="column do-column">
          <h3 class="column-title do-title">Do write</h3>
          <ul class="column-list">
            <li>What the component/module is for</li>
            <li>What data it receives and emits</li>
            <li>How it should behave</li>
            <li>Hard constraints</li>
            <li>What it may assume exists</li>
          </ul>
        </div>
        
        <div class="column dont-column">
          <h3 class="column-title dont-title">Don't write</h3>
          <ul class="column-list">
            <li>HTML structure or markup</li>
            <li>CSS class names or style values</li>
            <li>Variable names or function signatures</li>
            <li>Implementation strategy</li>
          </ul>
        </div>
      </div>
      
      <p class="footer-text">The generator decides how. You decide what.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.write-what-not-how {
  background-color: #111111;
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
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.paragraph {
  font-size: 1.25rem;
  text-align: center;
  color: #a3a3a3;
  margin-bottom: 3rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.column {
  background: #1a1a1a;
  border: 1px solid #262626;
  border-radius: 0.75rem;
  padding: 2rem;
}

.column-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.do-title {
  color: #22c55e;
}

.dont-title {
  color: #ef4444;
}

.column-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.column-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #262626;
  color: #d4d4d4;
  font-size: 1rem;
}

.column-list li:last-child {
  border-bottom: none;
}

.footer-text {
  text-align: center;
  font-style: italic;
  color: #9ca3af;
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .write-what-not-how {
    padding: 3rem 0;
  }
  
  .heading {
    font-size: 2rem;
  }
  
  .paragraph {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }
  
  .columns {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .column {
    padding: 1.5rem;
  }
  
  .column-title {
    font-size: 1.25rem;
  }
}
</style>