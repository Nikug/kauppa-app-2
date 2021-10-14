import React, { useCallback, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { checkDrop } from "../../utilities/listItem";
import { DefaultView } from "./DefaultView";
import { EditView } from "./EditView";
import classNames from "classnames";

const itemStyles = classNames(
  "w-full",
  "bg-white",
  "shadow",
  "border-gray-300",
  "border",
  "rounded",
  "py-2",
  "px-4",
  "hover:shadow-md"
);

interface Props {
  folderId: string;
  item: ListItem;
  order: number;
  editedItem: string | null;
  setItem(folderId: string, itemId: string, value: string): void;
  setEditing(folderId: string | null, itemId: string | null): void;
  reorder(result: DndResult): void;
}

export const ListItem = (props: Props) => {
  const { folderId, item, order, editedItem, setItem, setEditing, reorder } =
    props;
  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag<
    DndSource,
    unknown,
    { isDragging: boolean }
  >({
    type: "item",
    item: { id: item.id, index: order, parents: [] },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "item",
    hover: (sourceItem: DndSource, monitor) => {
      if (sourceItem.id === item.id) return;
      reorder({
        source: sourceItem.id,
        sourceIndex: sourceItem.index,
        target: item.id,
        targetIndex: 0,
      });
    },
    canDrop: (sourceItem) => {
      return checkDrop(sourceItem.id, item.id, []) ?? false;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const disabled = editedItem != null && editedItem !== item.id;
  const isEdited = editedItem === item.id;

  const handleUpdate = useCallback(() => {
    if (!inputRef) return;
    const newValue = inputRef.current?.value;
    setItem(folderId, item.id, newValue ?? "");
    setEditing(null, null);
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
    state ? setEditing(folderId, item.id) : setEditing(null, null);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <div
      ref={drag}
      className={classNames(
        itemStyles,
        { "bg-gray-100": disabled },
        "bg-red-500 bg-opacity-50",
        { "bg-green-500": canDrop },
        { "bg-blue-500": isOver },
        { "opacity-0": isDragging }
      )}
    >
      <div ref={drop}>
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
            item={item}
            disabled={disabled}
            handleEditing={handleEditing}
          />
        )}
      </div>
    </div>
  );
};
