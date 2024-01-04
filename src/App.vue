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

const keyPressed = ref();
const ttyStack = ref([]);
const ttyLine = 0;

onMounted(() => {
  window.addEventListener("keydown", function (ev) {
    keyPressed.value = ev.key;
    updateCurrentCommand(ev.key);
    console.log("keydown");
  });
});

function updateCurrentCommand(key) {
  console.log(currentCommand.value.slice(0, currentCommand.value.length - 1));
  // while (keyHold) {
  if (key === "Backspace") {
    currentCommand.value = currentCommand.value.slice(
      0,
      currentCommand.value.length - 1
    );
  } else if (key == "Enter") {
    // const newSpan = document.createElement('span');
    // newSpan.innerHTML = "{{ cwd }}{{ currentCommand }}{{ cursor }}";
    // newSpan.setAttribute("style", "font-size: 20px");
    // document.getElementById("root").appendChild(newSpan);
    ttyStack.value.push({
      cwd: cwd.value,
      currentCommand: currentCommand.value,
      cursor: "",
    });
    currentCommand.value = "";
  } else {
    currentCommand.value = currentCommand.value + key;
  }
  // }
}

const cwd = ref("(home) > ");

const currentCommand = ref("");
let cursorFlag = true;
const cursor = ref("");
setInterval(() => {
  if (cursorFlag) {
    cursor.value = "_";
    cursorFlag = false;
  } else {
    cursor.value = "";
    cursorFlag = true;
  }
}, 500);

// const square = ref(null);

// const isMenuOpen = ref(false);

// watch(isMenuOpen, (newValue) => {
//   if (newValue) {
//     expandMenu();
//   } else {
//     closeMenu();
//   }
// });

// function expandMenu() {
//   console.log("exceuted");
//   anime({
//     targets: square.value,
//     width: { value: "100%", duration: 300 },
//     // height: { value: 100, duration: 500 },
//     easing: "easeOutExpo",
//   });
// }

// function closeMenu() {
//   anime({
//     targets: square.value,
//     width: { value: "128px", duration: 500 },
//     // height: { value: 128, duration: 300 },
//     easing: "easeOutExpo",
//   });
// }
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
  height: 128px;
  margin: 1px;
  background-color: currentColor;
  font-size: 12px;
  color: #2c3e50;
  /* border-radius: 15px; */
}
</style>
