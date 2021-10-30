import classNames from "classnames";
import { EmojiSadIcon } from "@heroicons/react/outline";

const classes = classNames(
  "w-full",
  "bg-white",
  "py-2",
  "px-4",
  "text-gray-500",
  "font-semibold"
);

export const EmptyListItem = () => {
  return (
    <div className={classes}>
      <div className="flex justify-center items-center">
        Empty
        <EmojiSadIcon className="ml-1 h-5 w-5" />
      </div>
    </div>
  );
};
