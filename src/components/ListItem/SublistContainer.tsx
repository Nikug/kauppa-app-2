import { ListItem } from ".";
import React from "react";
import classNames from "classnames";

const styles = classNames();

interface Props {
  items?: ListItem[];
  editedItem: string | null;
  setItem(ids: string[], value: string): void;
  setItemEditing(id: string | null): void;
}

export const SublistContainer = (props: Props) => {
  const { items, editedItem, setItem, setItemEditing } = props;

  return items ? (
    <div className={styles}>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          item={item}
          order={index}
          editedItem={editedItem}
          setItem={setItem}
          setItemEditing={setItemEditing}
        />
      ))}
    </div>
  ) : null;
};
