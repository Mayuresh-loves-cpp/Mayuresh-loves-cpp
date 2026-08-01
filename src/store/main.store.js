import { defineStore } from "pinia";
import { computed, ref, shallowRef } from "vue";
import { useRouter } from "vue-router";

import { h } from "vue";
import Neofetch from "../components/Neofetch.vue";

// importing directory structure
import RootStructure from "../modules/dirStructure.js";

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
    isCustomOutput: false,
    component: null,
    showInputLine: true,
  };
  for (let i in mapResponse) {
    returnObject[i] = mapResponse[i];
  }
  return returnObject;
}

export const envStore = defineStore("env", () => {
  // local vars
  const router = useRouter();

  // env vars
  const pwd = ref("/home/mayuresh");
  const debugMode = ref(true);
  const commandHistory = ref([]);

  // getter methods
  const getPWD = computed(() => pwd);

  // default exec functions
  function setToDefaultDir() {
    pwd.value = "/home/mayuresh";
  }

  // utility methods for executables
  function findDirectory(relativeArgPath) {
    console.log("from change directory function");
    console.log("relative path:", relativeArgPath);
    console.log("root structure", RootStructure);

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

    let currentDir = JSON.parse(JSON.stringify(RootStructure));
    function returnFullPathIfDirectoryExists() {
      console.log("path queue", pathQueue);
      let folder = pathQueue[0];
      for (let i in currentDir.children) {
        if (currentDir.children[i].name == pathQueue[0]) {
          currentDir = currentDir.children[i];
          pathQueue.shift();
          let returnValue;
          if (pathQueue.length) {
            let returnPath = returnFullPathIfDirectoryExists();
            if (returnPath) {
              returnValue = folder + "/" + returnPath;
            } else {
              return folder;
            }
            // returnValue = folder + "/" + returnFullPathIfDirectoryExists();
            console.log("return value top if", returnValue);
            return returnValue;
          } else {
            returnValue = folder == undefined ? "" : folder;
            console.log("return value bellow if", returnValue);
            return returnValue;
          }
        }
      }
    }
    return "/" + returnFullPathIfDirectoryExists();
  }

  function cdToParentDirtectory() {
    if (pwd.value != "/") {
      // if (pwd.value.startsWith("/")) {
      // const lastSlashIndex = pwd.value.lastIndexOf("/");
      // if (lastSlashIndex == 0) {
      //   console.log("going to root");
      //   // console.log("in root....................");
      //   pwd.value = "/";
      //   // console.log("pwd", pwd.value);
      // } else {
      //   pwd.value = pwd.value.substring(0, pwd.value.lastIndexOf("/"));
      // }
      // }
      console.log("pwd before", pwd.value);
      const pathParts = pwd.value.split("/");
      if (pathParts.length > 0) {
        pathParts.shift(); // Remove the first empty part
        pathParts.pop(); // Remove the last part
        console.log("path parts after pop", pathParts);
        if (pathParts.length == 0) {
          pwd.value = "/";
        } else {
          pwd.value = pathParts.join("/");
        }
      } else {
        pwd.value = "/";
      }
      console.log("pwd after", pwd.value);
    }
  }

  function getCurrentDirectoryContent(root, dirStack) {
    console.log("next dir", dirStack, root);
    while (dirStack.length > 0) {
      console.log("children", root.children, dirStack[0]);
      for (let i = 0; i < root.children.length; i++) {
        if (root.children[i].name == dirStack[0]) {
          root = root.children[i];
          dirStack.shift();
          break;
        }
      }
    }
    return root.children.map((content) =>
      content.type != "dir" ? content.name : content.name + "/"
    );
  }

  function listContentsOfDir() {
    if (pwd.value == "/") {
      return getCurrentDirectoryContent(RootStructure, []).join("\n");
    } else {
      let dirStack = pwd.value.substring(1).split("/");
      return getCurrentDirectoryContent(RootStructure, dirStack).join("\n");
    }
  }

  const commands = [
    {
      command: "whoami",
      exec: function (args) {
        const name = `
███╗   ███╗ █████╗ ██╗   ██╗██╗   ██╗██████╗ ███████╗███████╗██╗  ██╗
████╗ ████║██╔══██╗╚██╗ ██╔╝██║   ██║██╔══██╗██╔════╝██╔════╝██║  ██║
██╔████╔██║███████║ ╚████╔╝ ██║   ██║██████╔╝█████╗  ███████╗███████║
██║╚██╔╝██║██╔══██║  ╚██╔╝  ██║   ██║██╔══██╗██╔══╝  ╚════██║██╔══██║
██║ ╚═╝ ██║██║  ██║   ██║   ╚██████╔╝██║  ██║███████╗███████║██║  ██║
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝`;
        return name;
      },
    },
    {
      command: "cd",
      exec: function (args) {
        if (args.length) {
          if (args[0] == "..") {
            console.log("cd to parent dir");
            cdToParentDirtectory();
          } else if (args[0] == ".") {
            // eat 5star do nothing
          } else {
            if (args[0] == "/") {
              pwd.value = "/";
            } else {
              var foundPath = findDirectory(args[0]);
              if (foundPath.includes(args[0])) {
                pwd.value = foundPath;
                // return null;
              } else {
                return `bash: cd: ${args[0]}: No such file or directory`;
              }
            }
          }
        } else {
          setToDefaultDir();
        }
        // return getPWD; // this will show getPWD value after every cd command
        return null;
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
        let output = "";
        for (let i in commandHistory.value) {
          output = output + i + " " + commandHistory.value[i] + "\n";
        }
        // return commandHistory.value.join("\n") + "\nhistory";
        return output;
      },
    },
    {
      command: "ls",
      exec: function (args) {
        return listContentsOfDir();
        // return ".  ..  sample.txt";
      },
    },
    {
      command: "pwd",
      exec: function (args) {
        return getPWD.value;
      },
    },
    {
      command: "cmatrix",
      exec: function (args) {
        router.push({ name: "cmatrix" });
        // router.replace({ name: "cmatrix" });
        return;
      },
    },
    {
      command: "neofetch",
      exec: function (args) {
        // router.push({ name: "cmatrix" });
        // router.replace({ name: "cmatrix" });
        const customOutput = {
          component: shallowRef(Neofetch),
        };
        return customOutput;
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
            const output = commands[i].exec(args);
            console.log("Command exceuted!!");
            if (typeof output == "string" || output instanceof String) {
              console.log("output is string");
              return sendResponse({
                stdout: output,
                isCustomOutput: false,
                component: undefined,
              });
            } else if (output instanceof Object) {
              if (output.component) {
                return sendResponse({
                  stdout: null,
                  isCustomOutput: true,
                  component: output.component,
                });
              } else {
                return sendResponse({
                  stdout: output.stdout,
                  isCustomOutput: false,
                  component: undefined,
                });
              }
            } else {
              return sendResponse({ stdout: output });
            }
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
    commandHistory,

    // getters
    getPWD,

    // methods
    setToDefaultDir,
    validateAndExec,
  };

  return exposeObject;
});
