import {
  checkDrop,
  findAndRemoveWithId,
  insertWithIdAndIndex,
} from "../../utilities/listItem";
import clonedeep from "lodash.clonedeep";
import { ListItem } from "../ListItem";
import React from "react";
import { useDrop } from "react-dnd";

interface Props {
  items: ListItem[];
  setItem(ids: string[], value: string): void;
  setItems(items: ListItem[]): void;
  setEditing(id: string | null): void;
  isEditing: string | null;
}

const MAIN_ID = "main";

export const ListContainer = (props: Props) => {
  const { items, setItem, setEditing, isEditing, setItems } = props;

  const [, drop] = useDrop({
    accept: "item",
    drop: (droppedItem: DndSource, monitor) => {
      if (monitor.didDrop()) return;
      handleReorder({
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

  const handleReorder = (result: DndResult) => {
    const { source, target, sourceIndex, targetIndex } = result;

    if (!target || !source) return;
    if (target === source) return;

    const itemsCopy = clonedeep(items);
    const foundItem = findAndRemoveWithId(itemsCopy, source);

    if (!foundItem) return;
    insertWithIdAndIndex(
      { id: MAIN_ID, item: "", subitems: itemsCopy },
      foundItem,
      target,
      targetIndex
    );
    setItems(itemsCopy);
  };

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
          handleReorder={handleReorder}
        />
      ))}
    </div>
  );
};
