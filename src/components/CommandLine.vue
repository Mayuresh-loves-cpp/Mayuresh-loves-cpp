<template>
  <div>
    <span style="font-size: 20px; white-space: pre"
      >[{{ cwd }}] > {{ command }}{{ cursor }}
      <pre v-if="output != null" class="">{{ output.stdout }}</pre>
    </span>
  </div>
</template>

<script setup>
defineProps({
  cwd: {
    type: String,
  },
  command: {
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
  margin: inherit;
}
</style>
