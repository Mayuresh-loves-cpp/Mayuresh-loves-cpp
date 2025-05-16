<template>
  <div>
    <span v-if="mobileLayout" style="font-size: 20px; white-space: pre"
      >[{{ cwd }}] >
      <pre v-if="output != null" class="">{{ output.stdout }}</pre>
    </span>
    <span v-else style="font-size: 20px; white-space: pre"
      >[{{ cwd == "/home/mayuresh" ? "~" : cwd }}] >
      {{ command }}{{ cursor }}
      <pre v-if="output != null" class="">{{ output.stdout }}</pre>
    </span>
  </div>
</template>

<script setup>
import { envStore } from "../store/main.store.js";

const dataStore = envStore();

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
  mobileLayout: {
    type: Boolean,
    required: true,
    default: false,
  },
});
</script>

<style scoped>
.output {
  white-space: pre-line;
  margin: inherit;
}
</style>
