declare interface ListItem {
  id: string;
  item: string;
}

declare interface ItemFolder {
  id: string;
  name: string;
  items: ListItem[];
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
