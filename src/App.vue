<template>
  <div class="root" id="root">
    <!-- <button>Click Here to Animate</button> -->
    <!-- <div style="display: flex; height: 100vh">
      <div
        @click.native="console.log('clicked')"
        @mouseover="isMenuOpen = true"
        @mouseleave="isMenuOpen = false"
        class="block"
        ref="square"
      ></div>
    </div> -->
    <!-- <span style="font-size: 20px; white-space: pre;">
      {{ cwd }}{{ currentCommand }}{{ cursor }}
    </span> -->
    <KeepAlive>
      <CommandLine
        v-for="(ele, index) in ttyStack"
        :key="index"
        :cwd="ele.cwd"
        :current-command="ele.currentCommand"
        :cursor="ele.cursor"
      ></CommandLine>
    </KeepAlive>
    <CommandLine
      :cwd="cwd"
      :current-command="currentCommand"
      :cursor="cursor"
    ></CommandLine>
    <h1>{{ keyPressed }}</h1>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import CommandLine from "./components/CommandLine.vue";
import anime from "animejs";

const square = ref();

function go() {
  console.log("exceuted");
  anime({ targets: ".block", translateX: 500 });
}
console.log(Object.keys(square));
</script>

<style >
@import url("https://fonts.googleapis.com/css2?family=VT323&display=swap");

.root {
  font-family: "VT323", monospace;
  color: chartreuse;
  background-color: black;
  /* height: 100vh; */
}

body {
  background-color: black;
}

.block {
  /* position: relative; */
  width: 128px;
  height: 800px;
  margin: 1px;
  background-color: currentColor;
  font-size: 12px;
  color: #2c3e50;
  /* border-radius: 15px; */
}
</style>
