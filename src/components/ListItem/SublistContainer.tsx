import { ListItem } from ".";
import React from "react";
import classNames from "classnames";

const styles = classNames("min-h-16");

interface Props {
  items?: ListItem[];
  parents: string[];
  editedItem: string | null;
  setItem(ids: string[], value: string): void;
  setItemEditing(id: string | null): void;
  handleReorder(result: DndResult): void;
}

export const SublistContainer = (props: Props) => {
  const { items, parents, editedItem, setItem, setItemEditing, handleReorder } =
    props;

  return items ? (
    <div className={styles}>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          item={item}
          parents={parents}
          order={index}
          editedItem={editedItem}
          setItem={setItem}
          setItemEditing={setItemEditing}
          handleReorder={handleReorder}
        />
      ))}
    </div>
  ) : null;
};
