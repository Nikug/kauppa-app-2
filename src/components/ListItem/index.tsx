import React from "react";
import classNames from "classnames";

interface Props {
  item: ListItem;
}

export const ListItem = (props: Props) => {
  const { item } = props;

  const classes = classNames(
    "w-full",
    "shadow",
    "border-gray-300",
    "rounded",
    "py-2",
    "px-4"
  );

  return <div className={classes}>{item.item}</div>;
};
