import React, { useEffect } from "react";
import {
  checkDrop,
  findAndRemoveWithId,
  insertWithIdAndIndex,
} from "../../utilities/listItem";
import clonedeep from "lodash.clonedeep";
import { ListItem } from "../ListItem";
import { useDrop } from "react-dnd";
import { MAIN_ID } from "../Home";

interface Props {
  reorder(result: DndResult): void;
  items: ListItem[];
  setItem(ids: string[], value: string): void;
  setItems(items: ListItem[]): void;
  setEditing(id: string | null): void;
  isEditing: string | null;
}

export const ListContainer = (props: Props) => {
  const { items, reorder, setItem, setEditing, isEditing, setItems } = props;
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
      return checkDrop(sourceItem.id, MAIN_ID, []);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className="flex flex-col gap-1">
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          parents={[MAIN_ID]}
          item={item}
          order={index}
          setItem={setItem}
          setItemEditing={setEditing}
          editedItem={isEditing}
          reorder={reorder}
        />
      ))}
    </div>
  );
};
