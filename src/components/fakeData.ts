export const generateFakeItems = (folders: number, items: number) => {
  let folderId = 1;
  let itemId = 1;
  const folderContainer: FolderContainer = {
    folders: {},
    folderOrder: [],
  };

  for (; folderId <= folders; folderId++) {
    const newFolder: ItemFolder = {
      id: `f-${folderId}`,
      name: `Folder ${folderId}`,
      collapsed: false,
      items: {},
      itemOrder: [],
    };

    for (; itemId <= items * folderId; itemId++) {
      const newItem: ListItem = {
        id: `i-${itemId}`,
        item: `Item ${itemId}`,
      };
      newFolder.items[newItem.id] = newItem;
      newFolder.itemOrder.push(newItem.id);
    }

    folderContainer.folders[newFolder.id] = newFolder;
    folderContainer.folderOrder.push(newFolder.id);
  }
  return folderContainer;
};
