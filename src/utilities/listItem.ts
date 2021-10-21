export const reorderItems = (
  folders: FolderContainer,
  sourceFolderId: string,
  sourceIndex: number,
  targetFolderId: string | undefined,
  targetIndex: number | undefined
) => {
  if (targetFolderId == null || targetIndex == null) return folders;
  if (sourceFolderId === targetFolderId && sourceIndex === targetIndex)
    return folders;

  const sourceFolder = { ...folders.folders[sourceFolderId] };
  if (!sourceFolder) return folders;

  // Same folder
  if (targetFolderId === sourceFolderId) {
    const [sourceItemId] = sourceFolder.itemOrder.splice(sourceIndex, 1);
    sourceFolder.itemOrder.splice(targetIndex, 0, sourceItemId);

    return {
      ...folders,
      [sourceFolderId]: sourceFolder,
    };
  }

  // Different folders
  const [sourceId] = sourceFolder.itemOrder.splice(sourceIndex, 1);
  const sourceItem = { ...sourceFolder.items[sourceId] };
  const newSourceFolder: ItemFolder = {
    ...sourceFolder,
    items: {},
    itemOrder: sourceFolder.itemOrder,
  };
  sourceFolder.itemOrder.map(
    (itemId) => (newSourceFolder.items[itemId] = sourceFolder.items[itemId])
  );

  const targetFolder = { ...folders.folders[targetFolderId] };
  targetFolder.itemOrder.splice(targetIndex, 0, sourceId);
  targetFolder.items[sourceId] = sourceItem;

  const newFolders = {
    ...folders,
    folders: {
      ...folders.folders,
      [sourceFolderId]: sourceFolder,
      [targetFolderId]: targetFolder,
    },
  };

  return newFolders;
};

export const reorderFolders = (
  folders: FolderContainer,
  sourceIndex: number,
  targetIndex: number | undefined
) => {
  if (targetIndex == null) return folders;
  if (sourceIndex === targetIndex) return folders;
  const foldersCopy = { ...folders };
  const [sourceFolder] = foldersCopy.folderOrder.splice(sourceIndex, 1);
  foldersCopy.folderOrder.splice(targetIndex, 0, sourceFolder);
  return foldersCopy;
};
