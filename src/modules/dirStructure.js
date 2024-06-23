const RootStructure = {
  label: "/",
  name: "root",
  type: "dir",
  children: [
    {
      label: "home",
      name: "home",
      type: "dir",
      children: [
        {
          label: "mayuresh",
          name: "mayuresh",
          type: "dir",
          children: [
            { label: ".config", name: ".config", type: "dir", children: [] },
            { label: ".bashrc", name: ".bashrc", type: "file", children: null },
          ],
        },
      ],
    },
    {
      label: "bin",
      name: "bin",
      type: "dir",
      children: [],
    },
    {
      label: "etc",
      label: "etc",
      type: "dir",
      children: [],
    },
  ],
};

export default RootStructure;
