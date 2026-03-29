<template>
  <section class="philosophy">
    <div class="container">
      <h2 class="heading">The next abstraction</h2>
      <p class="paragraph">
        Machine code. Assembly. C. Java. Every generation of programming languages traded low-level control for readability. But we were always bound to a specific syntax.
      </p>
      <p class="paragraph last">
        LLMs remove that constraint. You describe the requirements and intention of what a file should do, <span class="underline">in any human language you want</span>, and the model delivers the code.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.philosophy {
  padding: 6rem 0;
}

.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 2rem;
}

.heading {
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #ffffff;
}

.paragraph {
  font-size: 1.0625rem;
  line-height: 1.85;
  color: #a3a3a3;
  margin-bottom: 1.5rem;
  text-align: center;
}

.paragraph em {
  color: #d4d4d4;
  font-style: italic;
}

.paragraph.last {
  color: #d4d4d4;
  margin-bottom: 0;
}

.underline {
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 768px) {
  .philosophy {
    padding: 4rem 0;
  }

  .heading {
    font-size: 1.875rem;
  }

  .paragraph {
    font-size: 1rem;
  }
}
</style>
