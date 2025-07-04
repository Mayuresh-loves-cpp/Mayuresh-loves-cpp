const RootStructure = {
  label: "root",
  name: "/",
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
            { label: "Documents", name: "Documents", type: "dir", children: [] },
            { label: "Downloads", name: "Downloads", type: "dir", children: [] },
            { label: "Music", name: "Music", type: "dir", children: [] },
            { label: "Pictures", name: "Pictures", type: "dir", children: [] },
            { label: "Videos", name: "Videos", type: "dir", children: [] },
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
