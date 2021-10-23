import { ChevronRightIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { IconButton } from "./IconButton";

const iconClasses = (collapsed: boolean) =>
  classNames({ "rotate-90": !collapsed }, "transition-all", "ease-out");

interface Props {
  collapsed: boolean;
  onClick(): void;
}

export const CollapseButton = (props: Props) => {
  const { collapsed, onClick } = props;
  return (
    <IconButton
      icon={<ChevronRightIcon className={iconClasses(collapsed)} />}
      onClick={() => onClick()}
    />
  );
};
