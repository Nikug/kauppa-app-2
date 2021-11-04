import classNames from "classnames";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { IconButton } from "../buttons/IconButton";
import { PencilAltIcon } from "@heroicons/react/outline";

interface Props {
  item: ListItem;
  disabled: boolean;
  handleEditing(edit: boolean): void;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

export const DefaultView = (props: Props) => {
  const { item, disabled, handleEditing, dragHandleProps } = props;

  return (
    <div className="flex gap-2 justify-between items-center">
      <p
        {...dragHandleProps}
        className={classNames("font-semibold", "py-2", {
          "text-gray-500": disabled,
        })}
      >
        {item.item}
      </p>
      <IconButton
        icon={<PencilAltIcon className="h-5 w-5" />}
        onClick={() => handleEditing(true)}
        disabled={disabled}
      />
    </div>
  );
};
