<script setup lang="ts">
import Counter from "./components/Counter.vue";
import CopyButton from "./components/CopyButton.vue";
</script>

<template>
  <div style="max-width: 600px; margin: 2rem auto; font-family: sans-serif">
    <h1>Vue + Kun Sample</h1>
    <p>These components were generated from <code>.kun</code> files.</p>
    <Counter />
    <hr style="margin: 2rem 0" />
    <CopyButton text="Hello from Kun!" />
  </div>
</template>
