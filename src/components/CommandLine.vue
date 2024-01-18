<template>
  <div>
    <span style="font-size: 20px; white-space: pre">
      [{{ cwd }}] > {{ currentCommand }}{{ cursor }}
      <div v-if="output != null" class="output">
      {{ output.stdout }}
    </div>
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
  output: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped>
.output {
  white-space: pre-line;
}
</style>
