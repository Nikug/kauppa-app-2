import React from "react";
import { checkDrop } from "../../utilities/listItem";
import { useDrop } from "react-dnd";
import { MAIN_ID } from "../Home";
import { Folder } from "../Folder";

interface Props {
  createItem(folderId: string): void;
  reorder(result: DndResult): void;
  folders: ItemFolder[];
  setItem(folderId: string, itemId: string, value: string): void;
  setEditing(folderId: string | null, itemId: string | null): void;
  editedItem: string | null;
}

export const FolderContainer = (props: Props) => {
  const { folders, reorder, setItem, setEditing, editedItem, createItem } =
    props;
  const [, drop] = useDrop({
    accept: "item",
    drop: (droppedItem: DndSource, monitor) => {
      if (monitor.didDrop()) return;
      reorder({
        source: droppedItem.id,
        sourceIndex: droppedItem.index,
        target: MAIN_ID,
        targetIndex: 0,
      });
    },
    canDrop: (sourceItem) => {
      return checkDrop(sourceItem.id, MAIN_ID, []) ?? false;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className="flex flex-col gap-1">
      {folders.map((folder) => (
        <Folder
          createItem={createItem}
          key={folder.id}
          folder={folder}
          setItem={setItem}
          setEditing={setEditing}
          editedItem={editedItem}
          reorder={reorder}
        />
      ))}
    </div>
  );
};
