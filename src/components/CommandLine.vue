<template>
  <div>
    <span style="font-size: 20px; white-space: pre">
      {{ cwd }}{{ currentCommand }}{{ cursor }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  cwd: {
    type: String,
  },
  currentCommand: {
    type: String,
  },
  cursor: {
    type: String,
  },
});
</script>

<style scoped></style>
