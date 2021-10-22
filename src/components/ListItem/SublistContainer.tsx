import React from "react";
import { ListItem } from ".";
import classNames from "classnames";
import { Droppable } from "react-beautiful-dnd";
import { DndTypes } from "../Home";

const styles = classNames("min-h-16 flex flex-col");

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
  return items ? (
    <Droppable droppableId={folderId} type={DndTypes.item}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={styles}
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
      )}
    </Droppable>
  ) : null;
};
