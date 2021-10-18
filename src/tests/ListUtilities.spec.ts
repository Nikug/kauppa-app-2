import { reorderItems } from "../utilities/listItem";

const createItems = () => {
  return [
    {
      id: "f1",
      name: "folder 1",
      items: [
        {
          id: "i11",
          item: "item 1 1",
        },
        {
          id: "i12",
          item: "item 1 2",
        },
        {
          id: "i13",
          item: "item 1 3",
        },
      ],
    },
    {
      id: "f2",
      name: "folder 2",
      items: [
        {
          id: "i21",
          item: "item 2 1",
        },
        {
          id: "i22",
          item: "item 2 2",
        },
        {
          id: "i23",
          item: "item w 3",
        },
      ],
    },
  ];
};

describe("List item reoder", () => {
  it("Can move first -> second", () => {
    const originalFolders = createItems();
    const copyOfOriginal = createItems();

    const newFolders = reorderItems(originalFolders, "f1", 0, "f1", 1);

    expect(newFolders[0].items[0].id).toBe("i12");
    expect(newFolders[0].items[1].id).toBe("i11");
    expect(newFolders[0].items).toHaveLength(3);
    expect(originalFolders).toEqual(copyOfOriginal);
  });

  it("Can move second -> first", () => {
    const originalFolders = createItems();
    const copyOfOriginal = createItems();

    const newFolders = reorderItems(originalFolders, "f1", 1, "f1", 0);

    expect(newFolders[0].items[0].id).toBe("i12");
    expect(newFolders[0].items[1].id).toBe("i11");
    expect(newFolders[0].items).toHaveLength(3);
    expect(originalFolders).toEqual(copyOfOriginal);
  });

  it("Can move first -> third", () => {
    const originalFolders = createItems();
    const copyOfOriginal = createItems();

    const newFolders = reorderItems(originalFolders, "f1", 0, "f1", 2);

    expect(newFolders[0].items[0].id).toBe("i12");
    expect(newFolders[0].items[2].id).toBe("i11");
    expect(newFolders[0].items).toHaveLength(3);
    expect(originalFolders).toEqual(copyOfOriginal);
  });

  it("Can move third -> second", () => {
    const originalFolders = createItems();
    const copyOfOriginal = createItems();

    const newFolders = reorderItems(originalFolders, "f1", 2, "f1", 1);

    expect(newFolders[0].items[1].id).toBe("i13");
    expect(newFolders[0].items[2].id).toBe("i12");
    expect(newFolders[0].items).toHaveLength(3);
    expect(originalFolders).toEqual(copyOfOriginal);
  });

  it("Can move first -> first", () => {
    const originalFolders = createItems();
    const copyOfOriginal = createItems();

    const newFolders = reorderItems(originalFolders, "f1", 0, "f1", 0);

    expect(newFolders[0].items[0].id).toBe("i11");
    expect(newFolders[0].items[1].id).toBe("i12");
    expect(newFolders[0].items[2].id).toBe("i13");
    expect(newFolders[0].items).toHaveLength(3);
    expect(originalFolders).toEqual(copyOfOriginal);
  });

  it("Can move first -> first from different folders", () => {
    const originalFolders = createItems();
    const copyOfOriginal = createItems();

    const newFolders = reorderItems(originalFolders, "f1", 0, "f2", 0);

    expect(newFolders[0].items[0].id).toBe("i12");
    expect(newFolders[1].items[0].id).toBe("i11");
    expect(newFolders[0].items).toHaveLength(2);
    expect(newFolders[1].items).toHaveLength(4);
    expect(originalFolders).toEqual(copyOfOriginal);
  });

  it("Can move second -> third from different folders", () => {
    const originalFolders = createItems();
    const copyOfOriginal = createItems();

    const newFolders = reorderItems(originalFolders, "f2", 1, "f1", 2);

    expect(newFolders[0].items[2].id).toBe("i22");
    expect(newFolders[1].items[1].id).toBe("i23");
    expect(newFolders[0].items).toHaveLength(4);
    expect(newFolders[1].items).toHaveLength(2);
    expect(originalFolders).toEqual(copyOfOriginal);
  });
});
