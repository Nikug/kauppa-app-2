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
  id: string;
  index: number;
  parents: string[];
}

declare interface DndResult {
  source?: string;
  target?: string;
  sourceIndex?: number;
  targetIndex?: number;
}
