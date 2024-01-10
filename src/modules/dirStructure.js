const RootStructure = {
  label: "/",
  name: "root",
  type: "dir",
  children: [
    {
      lable: "home",
      name: "home",
      type: "dir",
      children: [
        {
          label: "mayuresh",
          name: "mayuresh",
          type: "dir",
          children: [{ label: ".config", name: ".config", type: "file" }],
        },
      ],
    },
  ],
};

class DirRepresentation {
  constructor(label, name, type) {
    this.label = label,
    this.name = name,
    this.type = type,
    this.children = []
  }
}

export default RootStructure;
