<template>
  <div>
    <!-- for mobile layout -->
    <div v-if="mobileLayout">
      <span v-show="showCommandInputLine" class="commandline-input"
        >[{{ displayCwd }}] >
      </span>
      <pre v-if="output != null" class="commandline-output">{{
        output.stdout
      }}</pre>
    </div>

    <!-- for desktop layout -->
    <div v-else>
      <span v-show="showCommandInputLine" class="commandline-input"
        >[{{ displayCwd }}] > {{ command }}{{ cursor }}
      </span>
      <pre
        v-if="output != null && !hasCustomOutput"
        class="commandline-output"
        >{{ output.stdout }}</pre
      >
      <slot name="custom-output"></slot>
    </div>

    <!-- <pre
      v-if="output != null && output == 'aboutme'"
      class="commandline-output"
      >{{ output.stdout }}</pre
    > -->
  </div>
</template>

<script setup>
import { envStore } from "../store/main.store.js";
import { ref, watch } from "vue";

const dataStore = envStore();

const commandLineProps = defineProps({
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
    required: false,
    default: false,
  },
  showCommandInputLine: {
    type: Boolean,
    // required: false,
    default: true,
  },
  hasCustomOutput: {
    type: Boolean,
    required: false,
    default: false,
  },
});
function formatCwdForDisplay(cwd) {
  console.log("home directory", dataStore.getHomeDir.value);
  console.log("current working directory", cwd);
  return cwd.replace(dataStore.getHomeDir.value, "~");
}

var displayCwd = ref(formatCwdForDisplay(commandLineProps.cwd));

watch(
  () => commandLineProps.cwd,
  (newCwd) => {
    displayCwd.value = formatCwdForDisplay(newCwd);
  },
);
</script>

<style scoped>
.output {
  white-space: pre-line;
  margin: inherit;
}
.commandline-input {
  font-size: 20px;
  white-space: pre;
  font-family: "Ubuntu Mono", monospace;
}
.commandline-output {
  font-size: 20px;
  white-space: pre;
  font-family: "Ubuntu Mono", monospace;
}
</style>
