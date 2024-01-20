class executable {
  executable(commandName, executableFunction) {
    this.command = commandName;
    this.exec = executableFunction;
  }
}

const commands = [
  new executable("whoami", function () {
    return "mayuresh";
  }),
];
