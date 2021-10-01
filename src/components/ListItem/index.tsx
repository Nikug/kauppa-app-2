import React, { useCallback, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { DefaultView } from "./DefaultView";
import { EditView } from "./EditView";
import { SublistContainer } from "./SublistContainer";
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
  item: ListItem;
  order: number;
  editedItem: string | null;
  setItem(ids: string[], value: string): void;
  setItemEditing(id: string | null): void;
  handleReorder(result: DndResult): void;
}

export const ListItem = (props: Props) => {
  const { item, order, editedItem, setItem, setItemEditing, handleReorder } =
    props;
  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag<
    DndSource,
    unknown,
    { isDragging: boolean }
  >({
    type: "item",
    item: { id: item.id, index: order },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop(() => ({
    accept: "item",
    drop: (sourceItem: DndSource, monitor) => {
      if (monitor.didDrop()) return;
      console.log("list item got it", sourceItem);
      handleReorder({
        source: sourceItem.id,
        sourceIndex: sourceItem.index,
        target: item.id,
        targetIndex: 0,
      });
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
    setItem([item.id], newValue ?? "");
    setItemEditing(null);
  }, [inputRef, setItem, setItemEditing, item.id]);

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
    state ? setItemEditing(item.id) : setItemEditing(null);
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
        "bg-red-500 bg-opacity-50"
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
      <SublistContainer
        items={item.subitems}
        editedItem={editedItem}
        setItem={(ids, value) => setItem([...ids, item.id], value)}
        setItemEditing={setItemEditing}
        handleReorder={handleReorder}
      />
    </div>
  );
};
