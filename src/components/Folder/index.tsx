import React from "react";
import classNames from "classnames";
import { SublistContainer } from "../ListItem/SublistContainer";
import { Button } from "../buttons/button";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  folder: ItemFolder;
  order: number;
  disabled?: boolean;
  editedItem: string | null;
  createItem(folderId: string): void;
  setItem(folderId: string, itemId: string, value: string): void;
  setEditing(itemId: string | null): void;
  toggleCollapse(folderId: string): void;
}

export const Folder = (props: Props) => {
  const {
    folder,
    order,
    disabled,
    editedItem,
    setItem,
    setEditing,
    createItem,
    toggleCollapse,
  } = props;

  return (
    <div className="bg-white">
      <Draggable draggableId={folder.id} index={order}>
        {(provided) => (
          <div
            className="flex justify-between items-center py-2 px-4"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <p
              {...provided.dragHandleProps}
              className={classNames(
                "font-semibold",
                { "text-gray-700": !disabled },
                { "text-gray-500": disabled }
              )}
            >
              {folder.name}
            </p>
            <Button text="Add" onClick={() => createItem(folder.id)} />
            <Button text="Collapse" onClick={() => toggleCollapse(folder.id)} />
          </div>
        )}
      </Draggable>
      <SublistContainer
        folderId={folder.id}
        items={folder.itemOrder.map((item) => ({ ...folder.items[item] }))}
        editedItem={editedItem}
        setItem={setItem}
        setEditing={setEditing}
        collapsed={folder.collapsed}
      />
    </div>
  );
};
