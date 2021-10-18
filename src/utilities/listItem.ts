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

export const reorderItems = (
  folders: ItemFolder[],
  sourceFolderId: string,
  sourceIndex: number,
  targetFolderId: string | undefined,
  targetIndex: number | undefined
) => {
  if (targetFolderId == null || targetIndex == null) return folders;
  if (sourceFolderId === targetFolderId && sourceIndex === targetIndex)
    return folders;

  const sourceFolderOriginal = folders.find(
    (folder) => folder.id === sourceFolderId
  );
  if (!sourceFolderOriginal) return folders;
  const sourceFolder = { ...sourceFolderOriginal };

  sourceFolder.items = [...sourceFolder.items];
  const [sourceItem] = sourceFolder.items.splice(sourceIndex, 1);

  if (targetFolderId === sourceFolderId) {
    sourceFolder.items.splice(targetIndex, 0, sourceItem);
    const newFolders = folders.map((folder) =>
      folder.id === sourceFolderId ? sourceFolder : folder
    );
    return newFolders;
  }

  const targetFolderOriginal = folders.find(
    (folder) => folder.id === targetFolderId
  );
  if (!targetFolderOriginal) return folders;
  const targetFolder = { ...targetFolderOriginal };

  targetFolder.items = [...targetFolder.items];
  targetFolder.items.splice(targetIndex, 0, sourceItem);
  const newFolders = folders.map((folder) => {
    if (folder.id === sourceFolder.id) return sourceFolder;
    if (folder.id === targetFolder.id) return targetFolder;
    return folder;
  });

  return newFolders;
};
