import { defineStore } from "pinia";
import { computed, ref } from "vue";

class Executable {
  Executable(commandName, executableFunction) {
    this.command = commandName;
    this.exec = executableFunction;
  }
}

function sendResponse(mapResponse) {
  const returnObject = {
    clearConsole: false,
    stdout: null,
    exitcode: 0,
    pushableInHistory: true,
  };
  for (let i in mapResponse) {
    returnObject[i] = mapResponse[i];
  }
  return returnObject;
}

export const envStore = defineStore("env", () => {
  const pwd = ref("/root/home");
  const getPWD = computed(() => pwd);
  function setToDefaultDir() {
    pwd.value = "~";
  }

  const commands = [
    {
      command: "whoami",
      exec: function (args) {
        return "mayuresh";
      },
    },
    {
      command: "cd",
      exec: function (args) {
        setToDefaultDir();
        return getPWD;
      },
    },
    {
      command: "echo",
      exec: function (args) {
        return args.join(" ");
      },
    },
    {
      command: "history",
      exec: function(args) {
        return 
      }
     }
  ];

  const shellManipulationCommands = [
    {
      command: "clear",
      set: {
        clearConsole: true,
      },
    },
  ];

  function validateAndExec(command, args) {
    console.log("in validate exec");
    if (typeof command == "string") {
      console.log("command recieved was string");
      if (command.length) {
        for (let i in commands) {
          console.log(commands[i].command, command, i, commands[i]);
          if (commands[i].command == command) {
            console.log("also found command!!");
            return sendResponse({ stdout: commands[i].exec(args) });
          }
        }
        for (let i in shellManipulationCommands) {
          if (shellManipulationCommands[i].command == command) {
            return sendResponse(shellManipulationCommands[i].set);
          }
        }
        return sendResponse({
          stdout: `webshell: ${command}: command not found`,
        });
      } else {
        return sendResponse({ pushableInHistory: false });
      }
    }
  }
  return { pwd, getPWD, setToDefaultDir, validateAndExec };
});
