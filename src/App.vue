<template>
  <div>
    <button @click="expand ? back() : go()">Click Here to Animate</button>
    <div class="block" ref="square">
      <ul style=" color: aliceblue;">
        <li>A</li>
        <li>B</li>
        <li>C</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import anime from "animejs";

const square = ref(null);
const expand = ref(true);

function go() {
  console.log("exceuted");
  anime({
    targets: square.value,
    width: "128px",
    easing: 'easeInOutExpo'
    // translateX: '500px',
    // loop: true,
    // easing: "easeInOutQuad",
    // direction: "alternate",
  });
  expand.value = true;
}

function back() {
  console.log("exceuted");
  anime({
    targets: square.value,
    width: "500px",
    easing: 'easeInOutExpo'
    // translateX: '500px',
    // loop: true,
    // easing: "easeInOutQuad",
    // direction: "alternate",
  });
  expand.value = false;
}
console.log(Object.keys(square));
</script>

<style scoped>
.block {
  pointer-events: none;
  position: relative;
  width: 128px;
  height: 800px;
  margin: 1px;
  background-color: currentColor;
  font-size: 12px;
  color: #2c3e50;
}
</style>
