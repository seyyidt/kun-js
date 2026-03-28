<template>
  <button @click="copyToClipboard" :disabled="copying">
    {{ buttonText }}
  </button>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const buttonText = ref('Copy')
const copying = ref(false)

const copyToClipboard = async () => {
  if (copying.value) return
  
  copying.value = true
  
  try {
    await navigator.clipboard.writeText(props.text)
    buttonText.value = 'Copied!'
    
    setTimeout(() => {
      buttonText.value = 'Copy'
      copying.value = false
    }, 2000)
  } catch (error) {
    buttonText.value = 'Failed to copy'
    copying.value = false
    
    setTimeout(() => {
      buttonText.value = 'Copy'
    }, 2000)
  }
}
</script>