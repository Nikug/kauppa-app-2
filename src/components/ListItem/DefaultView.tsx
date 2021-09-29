import { Button } from "../buttons/button";
import React from "react";
import classNames from "classnames";

interface Props {
  item: ListItem;
  disabled: boolean;
  handleEditing(edit: boolean): void;
}

export const DefaultView = (props: Props) => {
  const { item, disabled, handleEditing } = props;

  return (
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
  );
};
