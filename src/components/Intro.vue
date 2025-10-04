<template>
  <div class="intro-text">
    <!-- completed lines -->
    <div v-for="(line, idx) in displayedMessages" :key="idx">{{ line }}</div>

    <!-- typing line only while we're typing -->
    <div v-if="currentIndex < messages.length && currentLine">
      {{ currentLine }}<span class="cursor">|</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const messages = ref([
  "Hi! I'm Mayuresh Shinde",
  "I'm a fellow software developer to exist who likes to code",
]);

const displayedMessages = ref([]); // finished lines
const currentLine = ref(""); // line being typed
const currentIndex = ref(0); // which message is being typed

const typingSpeed = 80; // ms per character

function typeMessage(message) {
  return new Promise((resolve) => {
    let i = 0;
    function typeChar() {
      if (i < message.length) {
        currentLine.value += message[i];
        i++;
        // random delay between 50ms and 150ms
        const delay = Math.floor(Math.random() * 100) + 50;
        setTimeout(typeChar, delay);
      } else {
        resolve();
      }
    }
    typeChar();
  });
}

async function startTyping() {
  for (let i = 0; i < messages.value.length; i++) {
    currentLine.value = "";
    await typeMessage(messages.value[i]);
    displayedMessages.value.push(currentLine.value);
    currentIndex.value++;
    // removed the delay here
  }
}
onMounted(() => {
  startTyping();
});
</script>

<style scoped>
.cursor {
  display: inline-block;
  width: 8px;
  animation: blink 1s step-start infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.intro-text {
  font-size: 20px;
  color: chartreuse;
  font-family: "Ubuntu Mono", monospace;
  white-space: pre-line; /* Preserve whitespace and allow wrapping */
}
</style>
