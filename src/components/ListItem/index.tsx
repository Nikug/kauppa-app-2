import React, { useCallback, useEffect, useRef } from "react";
import { DefaultView } from "./DefaultView";
import { EditView } from "./EditView";
import classNames from "classnames";
import { Draggable } from "react-beautiful-dnd";

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
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const disabled = editedItem != null && editedItem !== item.id;
  const isEdited = editedItem === item.id;

  const handleUpdate = useCallback(() => {
    if (!inputRef) return;
    const newValue = inputRef.current?.value;
    setItem(folderId, item.id, newValue ?? "");
    setEditing(null);
  }, [inputRef, setItem, setEditing, item.id, folderId]);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target as Node)
      ) {
        handleUpdate();
      }
    },
    [inputContainerRef, handleUpdate]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleOutsideClick]);

  const handleEditing = (state: boolean) => {
    if (disabled) return;
    state ? setEditing(item.id) : setEditing(null);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleUpdate();
    }
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
              <EditView
                item={item}
                inputContainerRef={inputContainerRef}
                inputRef={inputRef}
                handleEnter={handleEnter}
                handleEditing={handleEditing}
                handleUpdate={handleUpdate}
              />
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
