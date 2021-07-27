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
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          editedItem={editedItem}
          setItem={setItem}
          setItemEditing={setItemEditing}
        />
      ))}
    </div>
  ) : null;
};
