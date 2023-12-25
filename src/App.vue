<template>
  <div>
    <button @click="go">Click Here to Animate</button>
    <div class="block" ref="square"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import anime from "animejs";

const square = ref();

function go() {
  console.log("exceuted");
  anime({ targets: ".block", translateX: 500 });
}
console.log(Object.keys(square));
</script>

<style scoped>
.block {
  pointer-events: none;
  position: relative;
  width: 128px;
  height: 128px;
  margin: 1px;
  background-color: currentColor;
  font-size: 12px;
  color: #2c3e50;
}
</style>
