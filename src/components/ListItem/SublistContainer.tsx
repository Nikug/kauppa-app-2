import { ListItem } from ".";
import React from "react";
import classNames from "classnames";

const styles = classNames("min-h-16");

interface Props {
  folderId: string;
  items?: ListItem[];
  editedItem: string | null;
  setItem(folderId: string, itemId: string, value: string): void;
  setEditing(folderId: string | null, itemId: string | null): void;
  reorder(result: DndResult): void;
}

export const SublistContainer = (props: Props) => {
  const { folderId, items, editedItem, setItem, setEditing, reorder } = props;

  return items ? (
    <div className={styles}>
      {items.map((item, index) => (
        <ListItem
          folderId={folderId}
          key={item.id}
          item={item}
          order={index}
          editedItem={editedItem}
          setItem={setItem}
          setEditing={setEditing}
          reorder={reorder}
        />
      ))}
    </div>
  ) : null;
};
