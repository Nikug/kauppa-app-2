import { ListItem } from ".";
import classNames from "classnames";
import { Droppable } from "react-beautiful-dnd";
import { DndTypes } from "../Home";
import { useLayoutEffect, useRef, useState } from "react";

const containerClasses = (collapsed: boolean) =>
  classNames(
    "min-h-16",
    "overflow-hidden",
    "flex",
    "flex-col",
    "transition-all"
  );

interface Props {
  folderId: string;
  items?: ListItem[];
  editedItem: string | null;
  collapsed: boolean;
  setItem(folderId: string, itemId: string, value: string): void;
  setEditing(itemId: string | null): void;
}

export const SublistContainer = (props: Props) => {
  const { folderId, collapsed, items, editedItem, setItem, setEditing } = props;
  const [listHeight, setListHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!collapsed) {
      const height = containerRef.current?.scrollHeight;
      setListHeight(height ?? 0);
    }
  }, [containerRef, setListHeight, collapsed, items]);

  return items ? (
    <Droppable droppableId={folderId} type={DndTypes.item}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div
            ref={containerRef}
            style={{
              height: collapsed ? 0 : listHeight,
            }}
            className={containerClasses(collapsed)}
          >
            {!collapsed &&
              items.map((item, index) => (
                <ListItem
                  key={item.id}
                  folderId={folderId}
                  item={item}
                  order={index}
                  editedItem={editedItem}
                  setItem={setItem}
                  setEditing={setEditing}
                />
              ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  ) : null;
};
