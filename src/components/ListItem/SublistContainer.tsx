import React from "react";
import { ListItem } from ".";
import classNames from "classnames";
import { Droppable } from "react-beautiful-dnd";

const styles = classNames("min-h-16 flex flex-col");

interface Props {
  folderId: string;
  items?: ListItem[];
  editedItem: string | null;
  setItem(folderId: string, itemId: string, value: string): void;
  setEditing(itemId: string | null): void;
}

export const SublistContainer = (props: Props) => {
  const { folderId, items, editedItem, setItem, setEditing } = props;
  return items ? (
    <Droppable droppableId={folderId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={styles}
        >
          {items.map((item, index) => (
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
