import React from "react";
import classNames from "classnames";
import { SublistContainer } from "../ListItem/SublistContainer";
import { Button } from "../buttons/button";

interface Props {
  folder: ItemFolder;
  disabled?: boolean;
  editedItem: string | null;
  createItem(folderId: string): void;
  setItem(folderId: string, itemId: string, value: string): void;
  setEditing(folderId: string | null, itemId: string | null): void;
  reorder(result: DndResult): void;
}

export const Folder = (props: Props) => {
  const {
    folder,
    disabled,
    editedItem,
    setItem,
    setEditing,
    reorder,
    createItem,
  } = props;

  return (
    <div className="">
      <div className="flex justify-between items-center py-2 px-4">
        <p
          className={classNames(
            "font-semibold",
            { "text-gray-700": !disabled },
            { "text-gray-500": disabled }
          )}
        >
          {folder.name}
        </p>
        <Button text="Add" onClick={() => createItem(folder.id)} />
      </div>
      <SublistContainer
        folderId={folder.id}
        items={folder.items}
        editedItem={editedItem}
        setItem={setItem}
        setEditing={setEditing}
        reorder={reorder}
      />
    </div>
  );
};
