class executable {
  executable(commandName, executableFunction) {
    this.command = commandName;
    this.exec = executableFunction;
  }
}

export const commands = [
  new executable("whoami", function (args) {
    return "mayuresh";
  }),
];

export function validateAndExec(command, args) {
  console.log("in validate exec command");
  if (typeof command == "string") {
    for (let i in commands) {
      if (commands[i].command == command) {
        return commands[i].exec(args);
      }
    }
  }
}
