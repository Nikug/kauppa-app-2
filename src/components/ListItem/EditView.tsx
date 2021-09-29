import React, { KeyboardEvent, RefObject } from "react";

import { Button } from "../buttons/button";
import { TextInput } from "../inputs/textInput";

interface Props {
  item: ListItem;
  inputRef: RefObject<HTMLInputElement>;
  inputContainerRef: RefObject<HTMLDivElement>;
  handleEnter(event: KeyboardEvent<HTMLInputElement>): void;
  handleEditing(edit: boolean): void;
  handleUpdate(): void;
}

export const EditView = (props: Props) => {
  const {
    item,
    inputContainerRef,
    inputRef,
    handleEnter,
    handleEditing,
    handleUpdate,
  } = props;

  return (
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
  );
};
