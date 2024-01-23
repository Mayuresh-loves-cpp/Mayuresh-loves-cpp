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
