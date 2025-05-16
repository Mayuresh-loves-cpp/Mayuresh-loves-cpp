import { defineStore } from "pinia";
import { computed, ref } from "vue";

// importing directory structure
import rootStructure from "../modules/dirStructure.js";

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
  // env vars
  const pwd = ref("/home/mayuresh");
  const debugMode = ref(true);

  // getter methods
  const getPWD = computed(() => pwd);

  // default exec functions
  function setToDefaultDir() {
    pwd.value = "/home/mayuresh";
  }

  function findDirectory(relativeArgPath) {
    console.log("from change directory function");
    console.log("relative path:", relativeArgPath);
    console.log("root structure", rootStructure);

    let pathQueue = null;

    if (relativeArgPath[0] == "/") {
      // indicates path given is absolute
      let parsedPath = relativeArgPath.slice(1);
      pathQueue = parsedPath.split("/");
      console.log("parsed path queue", pathQueue);
    } else {
      let parsedPath = pwd.value.slice(1) + "/" + relativeArgPath;
      pathQueue = parsedPath.split("/");
      console.log("parsed path queue", pathQueue);
    }

    let counter = 1;

    let currentDir = JSON.parse(JSON.stringify(rootStructure));
    function returnFullPathIfDirectoryExists() {
      let folder = pathQueue[0];
      for (let i in currentDir.children) {
        // console.log(
        //   "child folders                                                                                                       ",
        //   currentDir.children
        // );
        // console.log("path queue:", pathQueue);
        // console.log(
        //   "checking this condition:",
        //   currentDir.children[i].name,
        //   "and",
        //   pathQueue[0]
        // );
        if (currentDir.children[i].name == pathQueue[0]) {
          currentDir = currentDir.children[i];
          pathQueue.shift();
          if (pathQueue.length) {
            return folder + "/" + returnFullPathIfDirectoryExists();
          } else {
            return folder;
          }
        }
      }

      // }
      // console.log("breaking loop");
      // break;console.log("path queue:", pathQueue);
      // console.log("last folder");
      // return folder;
      // }
    }

    return "/" + returnFullPathIfDirectoryExists();
    // pwd.value = "/" + returnFullPathIfDirectoryExists();
    // console.log("final pwd value", pwd.value);
  }

  function cdToParentDirtectory() {
    if (pwd.value != "/") {
      if (pwd.value.startsWith("/")) {
        const lastSlashIndex = pwd.value.lastIndexOf("/");
        if (lastSlashIndex === 0) {
          // console.log("in root....................");
          pwd.value = "/";
          // console.log("pwd", pwd.value);
        }
        pwd.value = pwd.value.substring(0, pwd.value.lastIndexOf("/"));
      }
    }
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
        if (args.length) {
          if (args[0] == "..") {
            cdToParentDirtectory();
          } else if (args[0] == ".") {
            // eat 5star do nothing
          } else {
            var foundPath = findDirectory(args[0]);
            if (foundPath.includes(args[0])) {
              pwd.value = foundPath;
            } else {
              return `bash: cd: ${args[0]}: No such file or directory`;
            }
          }
        } else {
          setToDefaultDir();
        }
        return getPWD;
        // return;
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
      exec: function (args) {
        return;
      },
    },
    {
      command: "ls",
      exec: function (args) {
        return ".  ..  sample.txt";
      },
    },
    {
      command: "pwd",
      exec: function (args) {
        return getPWD;
      },
    },
    {
      command: "debug",
      exec: function (args) {
        if (args[0] == "on") {
          debugMode.value = true;
        }
        if (args[0] == "off") {
          debugMode.value = false;
        }
        console.log("debug mode updated:", debugMode);
      },
    },
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

  const exposeObject = {
    // vars
    pwd,
    debugMode,

    // getters
    getPWD,

    // methods
    setToDefaultDir,
    validateAndExec,
  };

  return exposeObject;
});
