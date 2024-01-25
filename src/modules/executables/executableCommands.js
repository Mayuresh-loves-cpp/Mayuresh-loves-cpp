class Executable {
  Executable(commandName, executableFunction) {
    this.command = commandName;
    this.exec = executableFunction;
  }
}

const commands = [
  {
    command: "whoami",
    exec: function (args) {
      return "mayuresh";
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

export function validateAndExec(command, args) {
  if (typeof command == "string") {
    if (command.length) {
      let commandFoundFlag = false;
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
    }
  } else {
    return sendResponse({ pushableInHistory: false });
  }
}
