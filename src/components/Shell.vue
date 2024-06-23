<template>
  <div
    class="root"
    id="root"
    style="cursor: text"
    @click="isMobileDevice ? showKeyboard() : null"
  >
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
    <!-- <Intro></Intro> -->
    <!-- <KeepAlive> -->

    <CommandLine
      v-for="(ele, index) in ttyStack"
      :key="index"
      :cwd="ele.cwd"
      :command="ele.command"
      :cursor="ele.cursor"
      :output="ele.output"
    ></CommandLine>
    <!-- </KeepAlive> -->
    <div style="display: flex">
      <CommandLine
        :cwd="cwd"
        :command="currentCommand"
        :cursor="cursor"
        :mobileLayout="isMobileDevice"
        ref="editableCommandLine"
      >
      </CommandLine>
      <div
        v-if="isMobileDevice"
        style="
          display: flex;
          justify-content: space-between;
          width: 100%;
          gap: 5px;
        "
      >
        <input
          type="text"
          enterKeyHint="go"
          v-model="mobileShellTextInput"
          ref="rootelement"
        />
        <Button
          icon="pi pi-arrow-right"
          style="padding: 2px"
          size="small"
          :dt="enterButtonDesignTree"
          :disabled="mobileShellTextInput.length == ''"
          @click="onMobileEnterButtonClick"
        />
      </div>
    </div>

    <div v-if="debugMode">
      <p>
        <span class="debug-key-text-color">Debug Mode status: </span
        >{{ debugMode }}
      </p>
      <p>
        <span class="debug-key-text-color">Mobile Device: </span
        >{{ isMobileDevice }}
      </p>
      <p>
        <span class="debug-key-text-color">key press: </span> {{ keyPressed }}
      </p>
      <p>
        <span class="debug-key-text-color">mobile input: </span>
        {{ mobileShellTextInput }}
      </p>
      <!-- <p>{{ ttyStack }}</p> -->
      <p>
        <span class="debug-key-text-color">command history: </span>
        {{ commandHistory }}
      </p>
      <p><span class="debug-key-text-color">pwd: </span>{{ dataStore.pwd }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import anime from "animejs";

// primevue component imports
import Button from "primevue/button";

// importing store
import { envStore } from "../store/main.store.js";
// import { execStore } from "../store/bin.store.js";

const dataStore = envStore();
// const binStore = execStore();

// import { validateAndExec } from "../modules/executables/executableCommands.js";

// components import
import CommandLine from "./CommandLine.vue";
// import Intro from "./Intro.vue";

const rootelement = ref();

const editableCommandLine = ref(null);

const keyPressed = ref();
const mobileShellTextInput = ref("");
const ttyStack = ref([]);
const ttyLine = 0;

const cwd = ref("home");
const currentCommand = ref("");
const commandHistory = ref([]);
let commandHistoryPointer = -1;

const regExForMobileDevices =
  /Mobile|Tablet|iP(hone|ad|od)|Android|BlackBerry|WebOS/i;

const isMobileDevice = ref(regExForMobileDevices.test(navigator.userAgent));

const debugMode = ref(true);

onMounted(() => {
  window.addEventListener("keydown", function (ev) {
    if (!isMobileDevice.value) {
      keyPressed.value = ev.key;
    }

    // console.log("isMobileDevice", isMobileDevice);
    updateCurrentCommand(keyPressed.value);
    // console.log("keydown");
  });
});

function openKeyboard() {
  editableCommandLine.value.focus();
}

function onMobileEnterButtonClick() {
  currentCommand.value = mobileShellTextInput.value;
  updateCurrentCommand("Enter");
  mobileShellTextInput.value = "";
}

function updateCurrentCommand(key) {
  console.log(currentCommand.value.slice(0, currentCommand.value.length - 1));
  let isPusshableToCommandStack = true;
  // while (keyHold) {
  if (key === "Backspace") {
    currentCommand.value = currentCommand.value.slice(
      0,
      currentCommand.value.length - 1
    );
  } else if (key == "Enter") {
    let [command, ...args] = currentCommand.value.split(" ");
    const output = dataStore.validateAndExec(command, args);
    console.log("output", output);
    const commandObject = {
      cwd: cwd.value,
      command: currentCommand.value,
      cursor: "",
      output: {
        stdout: output.stdout != null ? output.stdout : null,
      },
    };
    console.log(commandObject);
    if (output.pushableInHistory) {
      commandHistory.value.push(currentCommand.value);
    }
    if (output.clearConsole) {
      ttyStack.value.length = 0;
    } else {
      console.log("pushing to tty stack");
      ttyStack.value.push(commandObject);
    }
    currentCommand.value = "";

    // const commandObject = {
    //   cwd: cwd.value,
    //   command: currentCommand.value,
    //   cursor: "",
    //   output: {
    //     stdout: "",
    //   },
    // };
    // // const newSpan = document.createElement('span');
    // // newSpan.innerHTML = "{{ cwd }}{{ currentCommand }}{{ cursor }}";
    // // newSpan.setAttribute("style", "font-size: 20px");
    // // document.getElementById("root").appendChild(newSpan);
    // let [command, ...args] = currentCommand.value.split(" ");

    // // if (command == "") {
    // //   isPusshableToCommandStack = false;
    // // }
    // if (command == "clear") {
    //   ttyStack.value.length = 0;
    //   isPusshableToCommandStack = false;
    // } else if (command == "echo") {
    //   commandObject.output.stdout = args.join(" ");
    // } else if (command == "pwd") {
    //   commandObject.output.stdout = "/root/home";
    // } else if (command == "whoami") {
    //   commandObject.output.stdout = "mayuresh";
    // } else if (command == "neofetch") {
    //   commandObject.output.stdout = `
    // ███╗   ███╗ █████╗ ██╗   ██╗██╗   ██╗██████╗ ███████╗███████╗██╗  ██╗
    // ████╗ ████║██╔══██╗╚██╗ ██╔╝██║   ██║██╔══██╗██╔════╝██╔════╝██║  ██║
    // ██╔████╔██║███████║ ╚████╔╝ ██║   ██║██████╔╝█████╗  ███████╗███████║
    // ██║╚██╔╝██║██╔══██║  ╚██╔╝  ██║   ██║██╔══██╗██╔══╝  ╚════██║██╔══██║
    // ██║ ╚═╝ ██║██║  ██║   ██║   ╚██████╔╝██║  ██║███████╗███████║██║  ██║
    // ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝`;
    // } else if (command == "history") {
    //   commandObject.output.stdout = commandHistory.value.join("\n");
    // } else {
    //   if (!(command == "")) {
    //     commandObject.output.stdout = `webshell: ${currentCommand.value}: command not found`;
    //   }
    // }
    // if (!(command == "")) {
    //   commandHistory.value.push(command);
    // }
    // currentCommand.value = "";
    // if (isPusshableToCommandStack) {
    //   ttyStack.value.push(commandObject);
    // }
    commandHistoryPointer = -1;
  } else if (key == "ArrowUp") {
    let updateFlag = true;
    if (commandHistoryPointer == -1) {
      if (commandHistory.value.length > 0) {
        commandHistoryPointer = commandHistory.value.length - 1;
      } else {
        updateFlag = false;
      }
    } else {
      if (commandHistoryPointer > 0) {
        commandHistoryPointer--;
      }
    }
    console.log("commandHistoryPointer", commandHistoryPointer);
    if (updateFlag) {
      currentCommand.value = commandHistory.value[commandHistoryPointer];
    }
  } else if (key == "ArrowDown") {
    let updateFlag = true;
    if (!(commandHistoryPointer == -1)) {
      if (commandHistoryPointer < commandHistory.value.length - 1) {
        commandHistoryPointer++;
      }
    } else {
      updateFlag = false;
    }
    console.log("commandHistoryPointer", commandHistoryPointer);
    if (updateFlag) {
      currentCommand.value = commandHistory.value[commandHistoryPointer];
    }
  } else {
    currentCommand.value = currentCommand.value + key;
  }
  // }
}

function showKeyboard() {
  // rootelement.value.focus();
  rootelement.value.click();
}

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

const enterButtonDesignTree = ref({
  border: { radius: "1rem" },
  primary: {
    hover: { background: "#000", color: "#7fff00" },
    border: { color: "#7fff00" },
  },
});

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

<style scoped>
/* @import url("https://fonts.googleapis.com/css2?family=VT323&display=swap"); */
@import url("https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap");

.root {
  /* font-family: "VT323", monospace; */
  font-family: "Ubuntu Mono", monospace;
  color: chartreuse;
  background-color: black;
  margin: 10px;
  /* height: 100vh; */
  cursor: pointer;
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

input {
  /* all: unset; */
  outline: none;
  background-color: black;
  border: none;
  color: chartreuse;
  width: 100%;
}

.debug-key-text-color {
  color: red;
}

.p-button {
  background-color: rgb(0, 0, 0);
  color: chartreuse;
}
</style>
