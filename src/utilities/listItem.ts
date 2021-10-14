export const updateItemList = (
  folders: ItemFolder[],
  folderId: string,
  itemId: string,
  value: string
): ItemFolder[] => {
  const foundFolder = folders.find((folder) => folder.id === folderId);
  if (!foundFolder) return folders;
  const updatedItems = foundFolder.items.map((item) =>
    item.id === itemId ? { ...item, item: value } : item
  );
  const newFolders = folders.map((folder) =>
    folder.id === folderId ? { ...folder, items: updatedItems } : folder
  );
  return newFolders;
};

export const addNewItem = (
  folders: ItemFolder[],
  folderId: string,
  item: ListItem
) => {
  const newFolders = folders.map((folder) => {
    if (folder.id === folderId) {
      return { ...folder, items: [...folder.items, item] };
    }
    return folder;
  });
  return newFolders;
};

export const findAndRemoveWithId = (
  items: ListItem[],
  target: string
): ListItem | null => {
  return null;
};

export const insertWithIdAndIndex = (
  rootItem: ListItem,
  item: ListItem,
  target: string,
  index: number | undefined
) => {
  return null;
};

export const checkDrop = (
  sourceId: string,
  targetId: string,
  targetParents: string[]
) => {
  return null;
};
