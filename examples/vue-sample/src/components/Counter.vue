<template>
  <div class="counter">
    <div class="count-display">{{ count }}</div>
    <div class="button-group">
      <button @click="decrement" class="btn">-</button>
      <button @click="reset" class="btn reset">Reset</button>
      <button @click="increment" class="btn">+</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  initialCount: {
    type: Number,
    default: 0
  }
})

const count = ref(props.initialCount)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const reset = () => {
  count.value = props.initialCount
}
</script>

<style scoped>
.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.count-display {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.button-group {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 16px;
}

.btn:hover {
  background: #e0e0e0;
}

.btn.reset {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.btn.reset:hover {
  background: #0056b3;
}
</style>