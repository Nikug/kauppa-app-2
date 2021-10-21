export const fakeItems: FolderContainer = {
  folders: {
    f1: {
      id: "f1",
      name: "Folder 1",
      items: {
        1: {
          id: "1",
          item: "Item 1",
        },
        2: {
          id: "2",
          item: "Item 2",
        },
        3: {
          id: "3",
          item: "Item 3",
        },
      },
      itemOrder: ["1", "2", "3"],
    },
    f2: {
      id: "f2",
      name: "Folder 2",
      items: {
        4: {
          id: "4",
          item: "Item 4",
        },
        5: {
          id: "5",
          item: "Item 5",
        },
        6: {
          id: "6",
          item: "Item 6",
        },
      },
      itemOrder: ["4", "5", "6"],
    },
  },
  folderOrder: ["f1", "f2"],
};
