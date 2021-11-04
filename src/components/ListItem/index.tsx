import React, { useCallback, useRef } from "react";

import { DefaultView } from "./DefaultView";
import { DetectOutsideClick } from "../utilities/DetectOutsideClick";
import { Draggable } from "react-beautiful-dnd";
import { EditView } from "./EditView";
import classNames from "classnames";

const itemStyles = (isDragging: boolean, disabled: boolean) =>
  classNames(
    "w-full",
    "bg-white",
    "py-2",
    "px-4",
    "border",
    "border-gray-300",
    "border-opacity-0",
    "hover:border-opacity-100",
    { "border-opacity-100": isDragging },
    { "bg-gray-200": disabled }
  );

interface Props {
  folderId: string;
  item: ListItem;
  order: number;
  editedItem: string | null;
  setItem(folderId: string, itemId: string, value: string): void;
  setEditing(itemId: string | null): void;
}

export const ListItem = (props: Props) => {
  const { folderId, item, order, editedItem, setItem, setEditing } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const disabled = editedItem != null && editedItem !== item.id;
  const isEdited = editedItem === item.id;

  const handleUpdate = useCallback(() => {
    if (!inputRef) return;
    const newValue = inputRef.current?.value;
    setEditing(null);

    if (newValue === item.item) return;
    setItem(folderId, item.id, newValue ?? "");
  }, [inputRef, setItem, setEditing, item, folderId]);

  const handleEditing = (state: boolean) => {
    if (disabled) return;
    state ? setEditing(item.id) : setEditing(null);
  };

  return (
    <Draggable
      draggableId={item.id}
      isDragDisabled={!!editedItem}
      index={order}
    >
      {(provided, snapshot) => (
        <div
          className={itemStyles(snapshot.isDragging, disabled)}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div>
            {isEdited ? (
              <DetectOutsideClick onOutsideClick={handleUpdate}>
                <EditView
                  text={item.item}
                  inputRef={inputRef}
                  handleEditing={handleEditing}
                  handleUpdate={handleUpdate}
                />
              </DetectOutsideClick>
            ) : (
              <DefaultView
                dragHandleProps={provided.dragHandleProps}
                item={item}
                disabled={disabled}
                handleEditing={handleEditing}
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
