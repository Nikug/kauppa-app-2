declare interface ListItem {
  id: string;
  item: string;
}

declare interface FolderContainer {
  folders: Record<string, ItemFolder>;
  folderOrder: string[];
}

declare interface ItemFolder {
  id: string;
  name: string;
  items: Record<string, ListItem>;
  itemOrder: string[];
}

declare interface DndSource {
  sourceId: string;
  sourceFolderId: string;
}

declare interface DndResult {
  sourceId: string;
  sourceFolderId: string;
  targetId: string;
  targetFolderId: string;
}
