import React, { useEffect, useRef, useState } from "react";

import { Button } from "../buttons/button";
import { TextInput } from "../inputs/textInput";
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
  editedItem: string | null;
  setItem(id: string, value: string): void;
  setItemEditing(id: string | null): void;
}

export const ListItem = (props: Props) => {
  const { item, editedItem, setItem, setItemEditing } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const disabled = editedItem != null && editedItem !== item.id;
  const isEdited = editedItem === item.id;

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleUpdate = () => {
    if (!inputRef) return;
    const newValue = inputRef.current?.value;
    setItem(item.id, newValue ?? "");
    setItemEditing(null);
  };

  const handleEditing = (state: boolean) => {
    if (disabled) return;
    state ? setItemEditing(item.id) : setItemEditing(null);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      inputContainerRef.current &&
      !inputContainerRef.current.contains(event.target as Node)
    ) {
      handleUpdate();
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <div className={classNames(itemStyles, { "bg-gray-100": disabled })}>
      {isEdited ? (
        <div
          ref={inputContainerRef}
          className="flex justify-between items-center gap-2"
        >
          <TextInput
            ref={inputRef}
            defaultValue={item.item}
            className="flex-grow text-gray-700 font-semibold"
            onKeyDown={handleEnter}
            autoFocus
          />
          <div className="flex gap-2">
            <Button text="Cancel" onClick={() => handleEditing(false)} />
            <Button text="Ok" onClick={handleUpdate} />
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p
            className={classNames(
              "font-semibold",
              { "text-gray-700": !disabled },
              { "text-gray-500": disabled }
            )}
          >
            {item.item}
          </p>
          <Button
            text="Edit"
            onClick={() => handleEditing(true)}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};