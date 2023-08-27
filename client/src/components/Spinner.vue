<script setup lang="ts">
defineProps<{
  width: string
  height: string
}>()
</script>
<template>
  <div class="h-screen spinner">
    <div class="spinner__animate" :style="{ width: width, height: height }"></div>
  </div>
</template>

<style>
.spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.spinner__animate {
  border: 10px solid #6500ff;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;

  border-radius: 100%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
