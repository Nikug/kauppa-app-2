import { Button } from "../buttons/button";
import classNames from "classnames";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

interface Props {
  item: ListItem;
  disabled: boolean;
  handleEditing(edit: boolean): void;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

export const DefaultView = (props: Props) => {
  const { item, disabled, handleEditing, dragHandleProps } = props;

  return (
    <div className="flex justify-between items-center">
      <p
        {...dragHandleProps}
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
