import React, { RefObject } from "react";

import { Button } from "../buttons/button";
import { TextInput } from "../inputs/textInput";

interface Props {
  text: string;
  inputRef: RefObject<HTMLInputElement>;
  handleEditing(edit: boolean): void;
  handleUpdate(): void;
}

export const EditView = (props: Props) => {
  const { text, inputRef, handleEditing, handleUpdate } = props;

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <TextInput
        ref={inputRef}
        defaultValue={text}
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
