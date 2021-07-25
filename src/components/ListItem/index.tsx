import React, { useRef, useState } from "react";

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
  setItem(id: string, value: string): void;
}

export const ListItem = (props: Props) => {
  const { item, setItem } = props;
  const [isEditing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = () => {
    if (!inputRef) return;
    const newValue = inputRef.current?.value;
    setItem(item.id, newValue ?? "");
    setEditing(false);
  };

  return (
    <div className={itemStyles}>
      {isEditing ? (
        <div className="flex justify-between items-center gap-2">
          <TextInput
            ref={inputRef}
            defaultValue={item.item}
            className="flex-grow"
          />
          <div className="flex gap-2">
            <Button text="Cancel" onClick={() => setEditing(false)} />
            <Button text="Ok" onClick={handleUpdate} />
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p>{item.item}</p>
          <Button text="Edit" onClick={() => setEditing(true)} />
        </div>
      )}
    </div>
  );
};
